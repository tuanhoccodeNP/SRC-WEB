// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const faqForm = document.getElementById('faq-form');
    const faqList = document.getElementById('faq-list');

    // Lấy dữ liệu từ localStorage (nếu có)
    let faqs = JSON.parse(localStorage.getItem('faqs')) || [];

    // Hiển thị các câu hỏi đã lưu
    function renderFAQs() {
        faqList.innerHTML = ''; // Xóa nội dung cũ
        faqs.forEach((faq, index) => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq');
            faqItem.innerHTML = `
                <h3>Câu hỏi ${index + 1}: ${faq.question}</h3>
                <p><strong>Email:</strong> ${faq.email}</p>
                <p><strong>Số điện thoại:</strong> ${faq.phone}</p>
                <div class="reply-form">
                    <textarea id="reply-${index}" placeholder="Nhập câu trả lời..."></textarea>
                    <button onclick="submitReply(${index})">Gửi Trả Lời</button>
                </div>
                ${faq.reply ? `<p><strong>Trả lời:</strong> ${faq.reply}</p>` : ''}
            `;
            faqList.appendChild(faqItem);
        });
    }

    // Gửi câu hỏi mới
    faqForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const question = document.getElementById('question').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Thêm câu hỏi vào danh sách
        faqs.push({ question, email, phone, reply: '' });
        localStorage.setItem('faqs', JSON.stringify(faqs));

        // Hiển thị lại danh sách câu hỏi
        renderFAQs();

        // Reset form
        faqForm.reset();
    });

    // Gửi trả lời
    window.submitReply = function (index) {
        const reply = document.getElementById(`reply-${index}`).value;
        faqs[index].reply = reply;
        localStorage.setItem('faqs', JSON.stringify(faqs));
        renderFAQs();
    };

    // Khởi tạo slider (sử dụng Slick Slider)
    $('.banner').slick({
        autoplay: true,
        dots: true,
        arrows: false,
    });

    // Hiển thị các câu hỏi ban đầu
    renderFAQs();
});