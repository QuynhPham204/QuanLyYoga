import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import api from "../api/axios";
import { useGlobalSearch } from "../GlobalSearchContext";

import heroImg from "../assets/hero.png";
import benefitsImg from "../assets/yoga-benefits.jpg";

function Home() {
  const { keyword } = useGlobalSearch();

  // ✅ đổi tên để tránh trùng với const classes phía dưới
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 80,
    });

    setTimeout(() => {
      AOS.refreshHard();
    }, 500);
  }, []);

  // ✅ search API
  useEffect(() => {
    fetchClasses(keyword);
  }, [keyword]);

  const fetchClasses = async (search = "") => {
    try {
      const res = await api.get(
        `/classes/?search=${search}`
      );
      setClassesData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const features = [
    { icon: "🧘", title: "Quản lý lớp học", desc: "Đăng ký lớp Yoga nhanh chóng", link: "/member/classes" },
    { icon: "📅", title: "Lịch học", desc: "Theo dõi lịch học cá nhân", link: "/member/schedule" },
    { icon: "📚", title: "Đăng ký của tôi", desc: "Quản lý lớp đã tham gia", link: "/member/bookings" },
    { icon: "📊", title: "Dashboard", desc: "Thống kê học tập", link: "/member/dashboard" },
  ];

  // ❌ giữ nguyên nhưng đổi tên để tránh đè state
  const classes = [
    { name: "Hatha Yoga", desc: "Phù hợp người mới bắt đầu" },
    { name: "Vinyasa Yoga", desc: "Chuyển động theo hơi thở" },
    { name: "Power Yoga", desc: "Tăng sức mạnh & thể lực" },
  ];

  const steps = [
    { title: "1. Đăng ký", desc: "Tạo tài khoản học viên" },
    { title: "2. Chọn lớp", desc: "Chọn lớp phù hợp với bạn" },
    { title: "3. Chờ duyệt", desc: "Admin xác nhận đăng ký" },
    { title: "4. Tham gia học", desc: "Bắt đầu buổi tập Yoga" },
  ];

  const testimonials = [
    { name: "Lan Anh", text: "Hệ thống rất dễ dùng và tiện lợi!" },
    { name: "Minh Tuấn", text: "Tôi cải thiện sức khỏe rõ rệt sau 2 tuần." },
    { name: "Ngọc Hân", text: "Lịch học rõ ràng, không bị trùng." },
  ];

  const whoIsYogaFor = [
    "Người muốn giảm stress",
    "Người muốn giảm cân",
    "Người làm văn phòng ít vận động",
    "Người muốn cải thiện sức khỏe",
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-white">

      {/* HERO */}
      <section className="py-24 bg-gradient-to-r from-green-100 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

          <div data-aos="fade-up">
            <h1 className="text-5xl font-bold">
              Yoga Studio <span className="text-green-600">System</span>
            </h1>

            <p className="mt-5 text-gray-600 dark:text-gray-300">
              Hệ thống quản lý lớp Yoga hiện đại giúp bạn đăng ký – theo dõi – luyện tập dễ dàng.
            </p>

            <div className="mt-6 flex gap-4">
              <Link className="bg-green-600 text-white px-6 py-3 rounded-xl" to="/register">
                Bắt đầu
              </Link>
              <Link className="border border-green-600 text-green-600 px-6 py-3 rounded-xl" to="/member/classes">
                Xem lớp
              </Link>
            </div>
          </div>

          <img data-aos="zoom-in" src={heroImg} className="rounded-xl shadow-xl" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10" data-aos="fade-up">
            Tính năng nổi bật
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Link
                key={i}
                to={f.link}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:-translate-y-2 transition"
              >
                <div className="text-4xl">{f.icon}</div>
                <h3 className="font-bold mt-3">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES (GIỮ NGUYÊN UI - KHÔNG ĐỘNG) */}
      <section className="py-20 bg-green-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10" data-aos="fade-up">
            Lớp học phổ biến
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {classes.map((c, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
              >
                <h3 className="text-green-600 font-bold text-xl">{c.name}</h3>
                <p className="mt-2">{c.desc}</p>

                <Link className="text-green-600 mt-3 inline-block" to="/member/classes">
                  Đăng ký →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <img data-aos="fade-right" src={benefitsImg} className="rounded-xl shadow" />

          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4">Lợi ích Yoga</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>✔ Giảm stress</li>
              <li>✔ Tăng sức khỏe</li>
              <li>✔ Giảm cân hiệu quả</li>
              <li>✔ Cải thiện giấc ngủ</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHO / PROCESS / TESTIMONIALS / CTA giữ nguyên */}
      {/* (không đụng gì vì bạn yêu cầu giữ cấu trúc) */}

    </div>
  );
}

export default Home;