
// ==========================================
// 1. LẤY CÁC THÀNH PHẦN HTML
// ==========================================

const toggleMenu = document.getElementById("toggleMenu");
const cardList = document.getElementById("cardList");
const toggleIcon = document.getElementById("toggleIcon");
const toggleText = document.getElementById("toggleText");

// ==========================================
// 2. XỬ LÝ NÚT THU GỌN / MỞ RỘNG
// ==========================================

toggleMenu.addEventListener("click", function () {

    // Thêm hoặc xóa class collapsed
    const isCollapsed = cardList.classList.toggle("collapsed");

    if (isCollapsed) {

        // Menu đang thu gọn
        toggleIcon.textContent = "❯";
        toggleText.textContent = "Mở rộng";

        toggleMenu.setAttribute("aria-expanded", "false");
        toggleMenu.setAttribute("aria-label", "Mở rộng danh mục");

    } else {

        // Menu đang mở rộng
        toggleIcon.textContent = "❮";
        toggleText.textContent = "Thu gọn";

        toggleMenu.setAttribute("aria-expanded", "true");
        toggleMenu.setAttribute("aria-label", "Thu gọn danh mục");

    }

});
const backgroundSlides = document.querySelectorAll(
    ".background-slide"
);

// Thời gian hiển thị mỗi ảnh: 5 giây
const slideInterval = 60000;

// Thời gian chuyển động: 1 giây
const slideDuration = 1000;

// Ảnh đang hiển thị
let currentSlide = 0;

// Tránh chuyển ảnh chồng nhau
let isSliding = false;

// Khởi tạo vị trí ảnh
backgroundSlides.forEach((slide, index) => {
    slide.classList.remove(
        "active", "to-left", "to-right"
    );

    slide.classList.add(
        index === 0 ? "active" : "to-right"
    );
});

// Hàm chuyển sang ảnh tiếp theo
function nextBackgroundSlide() {

    if (isSliding || backgroundSlides.length < 2) {
        return;
    }

    isSliding = true;

    const nextSlide =
        (currentSlide + 1) % backgroundSlides.length;

    const currentElement = backgroundSlides[currentSlide];
    const nextElement = backgroundSlides[nextSlide];

    // Chuẩn bị ảnh tiếp theo ở bên phải,
    // không cho ảnh chạy ngược qua màn hình
    nextElement.style.transition = "none";
    nextElement.classList.remove("active", "to-left");
    nextElement.classList.add("to-right");

    // Buộc trình duyệt ghi nhận vị trí ban đầu
    void nextElement.offsetWidth;

    nextElement.style.transition = "";

    // Ảnh cũ trượt sang trái
    currentElement.classList.remove("active");
    currentElement.classList.add("to-left");

    // Ảnh mới trượt vào từ bên phải
    nextElement.classList.remove("to-right");
    nextElement.classList.add("active");

    // Kết thúc quá trình chuyển ảnh
    setTimeout(() => {

        currentElement.style.transition = "none";
        currentElement.classList.remove("to-left");
        currentElement.classList.add("to-right");

        void currentElement.offsetWidth;
        currentElement.style.transition = "";

        currentSlide = nextSlide;
        isSliding = false;

    }, slideDuration);
}

// Tự động chuyển ảnh mỗi 5 giây
if (backgroundSlides.length > 1) {
    setInterval(nextBackgroundSlide, slideInterval);
}