import { useEffect, useState } from "react";
import api from "../../api/axios";

function Classes() {

  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    trainer: "",
    max_slots: 20
  });

  useEffect(() => {
    fetchClasses();
    fetchTrainers();
  }, []);

  const fetchClasses = async () => {

    try {

      const res = await api.get("classes/");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      setClasses(data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainers = async () => {

    try {

      const res = await api.get("users/");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      const trainerList = data.filter(
        (u) => u.role === "trainer"
      );

      setTrainers(trainerList);

    } catch (err) {
      console.log(err);
    }
  };

  // 🟢 CREATE
  const handleCreate = async () => {

    try {

      await api.post("classes/", form);

      fetchClasses();

      setForm({
        name: "",
        trainer: "",
        max_slots: 20
      });

      setShowForm(false);

    } catch (err) {

      console.log(err);

      alert("Tạo lớp thất bại");
    }
  };

  // 🟡 EDIT
  const handleEdit = (cls) => {

    setShowForm(true);

    setEditId(cls.id);

    setForm({
      name: cls.name,
      trainer: cls.trainer,
      max_slots: cls.max_slots
    });
  };

  // 🔵 UPDATE
  const handleUpdate = async () => {

    try {

      await api.patch(
        `classes/${editId}/`,
        form
      );

      fetchClasses();

      setForm({
        name: "",
        trainer: "",
        max_slots: 20
      });

      setEditId(null);

      setShowForm(false);

    } catch (err) {

      console.log(err);

      alert("Cập nhật thất bại");
    }
  };

  // 🔴 DELETE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa lớp?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`classes/${id}/`);

      fetchClasses();

    } catch (err) {

      console.log(err);

      alert("Xóa thất bại");
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Quản lý lớp học
          </h1>

          <p className="text-gray-500 mt-2">
            Tạo lớp và phân công HLV
          </p>

        </div>

        <button
          onClick={() => {

            setShowForm(!showForm);

            if (showForm) {

              setEditId(null);

              setForm({
                name: "",
                trainer: "",
                max_slots: 20
              });
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg"
        >
          {showForm ? "Đóng" : "+ Tạo lớp"}
        </button>

      </div>

      {/* FORM */}
      {showForm && (

        <div className="bg-white p-6 rounded-3xl shadow-lg mb-6">

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Tên lớp"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              className="border p-3 rounded-xl"
            />

            <select
              value={form.trainer}
              onChange={(e) =>
                setForm({
                  ...form,
                  trainer: e.target.value
                })
              }
              className="border p-3 rounded-xl"
            >

              <option value="">
                -- Chọn HLV --
              </option>

              {trainers.map((trainer) => (

                <option
                  key={trainer.id}
                  value={trainer.id}
                >
                  {trainer.username}
                </option>

              ))}

            </select>

            <input
              type="number"
              placeholder="Số chỗ"
              value={form.max_slots}
              onChange={(e) =>
                setForm({
                  ...form,
                  max_slots: e.target.value
                })
              }
              className="border p-3 rounded-xl"
            />

          </div>

          <button
            onClick={
              editId
                ? handleUpdate
                : handleCreate
            }
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            {editId
              ? "Cập nhật lớp"
              : "Lưu lớp học"}
          </button>

        </div>
      )}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-5 text-left">
                Tên lớp
              </th>

              <th className="p-5 text-left">
                Huấn luyện viên
              </th>

              <th className="p-5 text-left">
                Số chỗ
              </th>

              <th className="p-5 text-center">
                Thao tác
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="4" className="p-8 text-center">
                  Đang tải...
                </td>
              </tr>

            ) : classes.length === 0 ? (

              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400">
                  Không có lớp học
                </td>
              </tr>

            ) : (

              classes.map((cls) => (

                <tr
                  key={cls.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-5 font-semibold">
                    {cls.name}
                  </td>

                  <td className="p-5">
                    {cls.trainer_name || "Chưa phân công"}
                  </td>

                  <td className="p-5">
                    {cls.max_slots}
                  </td>

                  <td className="p-5">

                    <div className="flex gap-3 justify-center">

                      <button
                        onClick={() => handleEdit(cls)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl"
                      >
                        Sửa
                      </button>

                      <button
                        onClick={() => handleDelete(cls.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                      >
                        Xóa
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Classes;