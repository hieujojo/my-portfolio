# Quy trình import mô hình 3D

Tài liệu này là checklist bắt buộc trước khi đưa `.glb`/`.gltf` vào portfolio.

## 1. Kiểm tra file gốc

- Đặt file vào `public/models/` với tên không dấu, không khoảng trắng.
- Giữ lại file gốc, không ghi đè trong quá trình tối ưu.
- Ghi author, nguồn tải và license vào `ASTRONAUT_MODEL_LICENSE.txt` tương ứng.
- Kiểm tra model có mesh, texture, skeleton và animation bằng `gltf-validator` hoặc `pygltflib`.

## 2. Kiểm tra material và texture

- Ưu tiên glTF 2.0 với `pbrMetallicRoughness`.
- Tránh hoặc chuyển đổi `KHR_materials_pbrSpecularGlossiness` vì Three.js có thể bỏ qua material và render màu xám.
- Texture nên dùng WebP/JPEG hợp lý; giữ alpha khi texture cần nền trong suốt.
- Sau khi chuyển đổi, kiểm tra lại toàn bộ texture vẫn được tham chiếu bởi material.

## 3. Tối ưu dung lượng

- Không giảm chất lượng mesh trước khi kiểm tra animation/skeleton.
- Nén texture trước, sau đó mới cân nhắc Draco/Meshopt cho geometry.
- Ghi lại kích thước trước/sau và load thử bản tối ưu trong trình duyệt.
- Không xóa file gốc cho đến khi bản tối ưu được kiểm tra thành công.

## 4. Tích hợp React Three Fiber

- Dùng `useGLTF('/models/<file>.glb')`, đúng hoa thường và đúng đường dẫn public.
- Bọc model bằng `group ref` rồi truyền `dispose={null}` để tránh Fast Refresh dispose scene cache.
- Kiểm tra đơn vị/kích thước bằng `Box3` trước khi chọn `scale` và `position`.
- Reset transform của scene sau Fast Refresh nếu model bị phóng đại hoặc thu nhỏ bất thường.
- Dùng `Suspense` + `CanvasLoader` và `useGLTF.preload()`.
- Nếu model cần chuyển động, chọn clip cụ thể, đặt `timeScale` thấp và dùng `frameloop="always"`.
- Nếu model phải đứng yên, pause tại một frame thay vì để bind pose T-pose.
- Tắt `OrbitControls` rotation/zoom/pan nếu hero không cần tương tác.

## 5. Kiểm tra trước khi commit

```bash
npx tsc --noEmit
npm run lint
git diff --check
```

Kiểm tra thủ công ở desktop và mobile: model không vượt navbar, không bị cắt, không bị xoay ngoài ý muốn, texture hiển thị đúng và không có cảnh báo GLTF nghiêm trọng trong Console.
