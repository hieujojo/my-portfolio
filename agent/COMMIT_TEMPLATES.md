# Quy trình và mẫu commit

## Quy trình giao hàng

- Với mỗi thay đổi trong repository, hãy triển khai, kiểm tra rồi tạo commit.
- Không commit khi validation thất bại; báo lỗi và sửa trước.
- Mỗi commit chỉ nên tập trung vào một thay đổi nhất quán.

## Định dạng commit

```text
<type>(<scope>): <subject>
```

### Type được phép

| Type | Sử dụng khi |
| --- | --- |
| `feat` | Thêm tính năng mới |
| `fix` | Sửa lỗi hoặc hành vi không đúng |
| `refactor` | Tái cấu trúc, không đổi mục đích tính năng |
| `chore` | Cấu hình, công cụ hoặc file phụ trợ |
| `opt` | Tối ưu hiệu năng, FPS hoặc bộ nhớ |
| `test` | Thêm hoặc sửa kiểm thử |
| `docs` | Cập nhật tài liệu và quy trình |

### Quy tắc subject bắt buộc

1. Viết hoàn toàn bằng tiếng Việt, có đầy đủ dấu.
2. Mô tả rõ đã làm gì, ưu tiên động từ cụ thể như `sửa`, `thêm`, `tách`, `đồng bộ`, `cập nhật`.
3. Viết thường chữ đầu tiên sau dấu `:`.
4. Không đặt dấu chấm ở cuối subject.
5. Không dùng các subject mơ hồ như `update code`, `fix bug` hoặc `changes`.

### Scope thường dùng

`app`, `nav`, `home`, `about`, `education`, `experience`, `skills`, `projects`, `contact`, `canvas`, `styles`, `data`, `assets`, `config`, `deps`, `docs`.

### Ví dụ hợp lệ

```text
feat(projects): thêm bộ lọc dự án theo nhóm công nghệ
fix(contact): giới hạn request và bổ sung honeypot chống bot
fix(responsive): ngăn navbar và hero chạm nhau trên màn hình nhỏ
refactor(education): đồng bộ nhãn timeline với giao diện vũ trụ
docs(docs): cập nhật hướng dẫn import mô hình 3D
```

## Validation trước commit

- Chạy `npm run lint`.
- Chạy `npx tsc --noEmit`.
- Chạy `git diff --check`.
- Với thay đổi lớn, chạy thêm `npm run build`.
- Nếu validation thất bại, không commit cho đến khi đã xử lý hoặc báo rõ nguyên nhân.

## Tài liệu

Cập nhật `README.md` khi thay đổi setup, lệnh chạy, cấu trúc hoặc hành vi người dùng. Không cần cập nhật README cho các thay đổi nội bộ không ảnh hưởng cách sử dụng repository.
