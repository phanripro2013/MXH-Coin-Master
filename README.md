
# Event Spin Counter - Trợ Lý Đếm Spin Thủ Công

Ứng dụng hỗ trợ game thủ theo dõi các sự kiện trong trò chơi một cách thủ công, khoa học và hiệu quả. Không can thiệp, không hack, không tự động hóa.

## ✨ Tính Năng
- **Overlay Nổi:** Nút bấm nổi trên màn hình game giúp đếm nhanh mà không cần chuyển ứng dụng.
- **Bộ Đếm 4 Sự Kiện (FREE):** Búa, Heo, SYM, Khiên.
- **Lịch Sử 3 Ngày:** Xem lại hiệu suất quay trong 3 ngày gần nhất.
- **Phiên PRO:**
  - Không giới hạn loại sự kiện.
  - Biểu đồ thống kê hình quạt & xu hướng.
  - Chế độ Tối (Dark Mode).
  - Xuất dữ liệu ra file CSV/TXT để phân tích.
  - Xóa quảng cáo và biểu tượng logo.

## 🛠 Tech Stack (Android)
- **Language:** Kotlin
- **UI:** Jetpack Compose (Material 3)
- **Database:** Room DB
- **Architecture:** MVVM + StateFlow
- **Overlay:** System Alert Window API
- **Billing:** Google Play Billing Library v6

## 🚀 Hướng Dẫn Build & Triển Khai

### 1. Build APK / AAB
- Mở project bằng **Android Studio Hedgehog** trở lên.
- Chạy `Build > Build Bundle(s) / APK(s) > Build APK(s)`.
- Để phát hành lên Google Play: `Build > Generate Signed Bundle / APK`.

### 2. Cài đặt Local
- Bật **Developer Options** và **USB Debugging** trên điện thoại.
- Kết nối máy tính và nhấn nút **Run** (mũi tên xanh) trong Android Studio.

### 3. Cài đặt In-App Purchase (PRO)
- Đăng ký ID sản phẩm `pro_unlock_onetime` trên Google Play Console.
- Đảm bảo version code trong `build.gradle` khớp với bản upload nháp trên console.

## 📄 Chính Sách & Pháp Lý
- Ứng dụng này là công cụ đếm thủ công (Manual Tracker).
- KHÔNG yêu cầu Accessibility Service.
- KHÔNG chụp ảnh màn hình hay can thiệp vào bộ nhớ game.
- Tuân thủ chính sách Developer của Google Play về "Game Assistant".

## 🎨 App Icon Prompt
> "A minimalist high-tech 3D target icon with a spin counter display, neon indigo and purple colors, rounded square background, professional mobile app style, clean glassmorphism effect."

---
*Phát triển bởi [Tên Của Bạn/Công Ty]*
