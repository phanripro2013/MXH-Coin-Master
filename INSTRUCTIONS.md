
# Event Spin Counter - Hướng Dẫn Kỹ Thuật

## 1. Quy Trình Build APK/AAB
- **Build APK:** `Build > Build Bundle(s) / APK(s) > Build APK(s)`. APK nằm tại `app/build/outputs/apk/pro/release/`.
- **Build AAB (Dành cho Store):** `Build > Generate Signed Bundle / APK`. Chọn `Android App Bundle`.
- **Ký tên ứng dụng:** Cần tạo Keystore (.jks) để ký bản Release trước khi upload Google Play.

## 2. Cài Đặt Local (Sideload)
1. Bật **Tùy chọn cho nhà phát triển** trên điện thoại.
2. Cho phép **Cài đặt ứng dụng từ nguồn không xác định**.
3. Copy file `.apk` vào điện thoại và nhấn cài đặt.
4. Cấp quyền **"Hiển thị trên các ứng dụng khác"** (Overlay Permission) khi mở app lần đầu.

## 3. GitHub & CI/CD (Codemagic)
- **GitHub Upload:** 
  1. `git init`
  2. `git add .`
  3. `git commit -m "Initial Production Release"`
  4. `git remote add origin <url_cua_ban>`
  5. `git push -u origin main`
- **Codemagic CI:**
  1. Kết nối repo GitHub với Codemagic.io.
  2. Chọn file `codemagic.yaml` có sẵn trong project.
  3. Mỗi khi push code, hệ thống sẽ tự động tạo link tải APK.

## 4. Xử Lý Quyền Overlay
Trong Android 9+, bạn phải điều hướng người dùng đến cài đặt hệ thống:
```kotlin
if (!Settings.canDrawOverlays(this)) {
    val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName"))
    startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE)
}
```
