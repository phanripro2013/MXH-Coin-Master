
# Hướng Dẫn Cấu Hình In-App Purchase (IAP)

### 1. Tạo sản phẩm trên Play Console
- Đi tới **Monetize > Products > In-app products**.
- Nhấn **Create product**.
- **Product ID:** `pro_unlock_onetime` (Phải trùng với mã trong code Kotlin).
- **Name:** Event Spin Counter Pro.
- **Price:** Thiết lập mức giá mong muốn (ví dụ: 199.000đ).

### 2. Kiểm thử IAP
- Thêm email tester vào danh mục **License Testing** trong Play Console.
- Sử dụng phiên bản build có cùng `versionCode` và được ký bởi cùng một certificate.
- Sử dụng phương thức thanh toán "Test card, always approves".

### 3. Logic Verify (Client-side)
Ứng dụng sử dụng `BillingClient` để kiểm tra trạng thái mua hàng mỗi khi khởi động:
```kotlin
val params = QueryPurchasesParams.newBuilder()
    .setProductType(BillingClient.ProductType.INAPP)
    .build()
billingClient.queryPurchasesAsync(params) { result, purchases ->
    val isPro = purchases.any { it.products.contains("pro_unlock_onetime") && it.isAcknowledged }
    // Cập nhật UI và DataStore
}
```
