# Repository Workflow

## Delivery và Commits

- Với mỗi yêu cầu thay đổi file trong repository, hãy thực hiện công việc, validate, rồi tự động tạo commit.
- Không commit nếu validation thất bại. Báo lỗi và sửa trước khi commit.
- Giữ mỗi commit tập trung vào một thay đổi nhất quán.

## Quy ước Commit

### Định dạng
```
<type>(<scope>): <subject>
```

### Các Type được phép
| Type | Khi nào dùng |
|---|---|
| `feat` | Thêm tính năng mới |
| `fix` | Sửa bug |
| `refactor` | Refactor code, không thay đổi logic |
| `chore` | Cập nhật package, cấu hình, gitignore |
| `opt` | Tối ưu hiệu năng, FPS, memory |
| `test` | Thêm/sửa test |

### Các Scope được phép
| Scope | Mô tả |
|---|---|
| `app` | App Router: layout, page, route handlers |
| `nav` | Điều hướng, menu responsive, scroll progress |
| `home` | Hero section và nội dung giới thiệu đầu trang |
| `about` | About section, dịch vụ và số liệu thống kê |
| `education` | Education section, tài liệu và lightbox |
| `experience` | Experience section, gallery và lightbox |
| `skills` | Skills section, marquee và solar-system layout |
| `projects` | Project data, bộ lọc và project cards |
| `contact` | Contact form, toast và gửi email |
| `canvas` | React Three Fiber, GLTF models, star field, canvas loader |
| `styles` | Tailwind, `globals.css`, design tokens và animation CSS |
| `data` | Static data và JSON mapping |
| `assets` | Ảnh, icon, PDF và mô hình trong `public/` hoặc `src/assets/` |
| `config` | Next.js, TypeScript, PostCSS, Tailwind và environment |
| `deps` | Dependencies và lockfile |
| `docs` | README, implementation plan và hướng dẫn nội bộ |

### Ví dụ
```
feat(projects): thêm bộ lọc dự án theo công nghệ
fix(contact): kiểm tra dữ liệu biểu mẫu trước khi gửi email
opt(canvas): giảm mật độ sao trên thiết bị cấu hình thấp
refactor(education): tách lightbox thành component tái sử dụng
chore(config): cập nhật cấu hình Next.js
feat(nav): thêm chỉ báo section đang xem
test(contact): thêm test cho contact route
```

### Quy tắc
1. Subject dùng tiếng Việt, nhất quán trong 1 PR
2. Subject **KHÔNG** viết hoa chữ đầu
3. Subject **KHÔNG** có dấu chấm cuối
4. Viết commit body khi cần giải thích thêm logic hoặc lý do thay đổi

## Validation

- Chạy các kiểm tra hẹp nhất trước, sau đó mở rộng khi cần.
- Luôn chạy `git diff --check` trước khi commit.
- Với thay đổi Python: compile các file đã chỉnh và kiểm tra import bằng virtual environment của project (nếu có).
- Với thay đổi Docker Compose: chạy `docker compose config --quiet` khi Docker Compose khả dụng.

## Documentation

- Review `README.md` sau mỗi thay đổi.
- Cập nhật `README.md` trong cùng commit khi có thay đổi về setup, cấu hình, lệnh, kiến trúc, hoặc hành vi người dùng thấy được.
- Không chỉnh tài liệu cho các thay đổi nội bộ không ảnh hưởng đến cách dùng repository.
