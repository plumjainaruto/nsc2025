document.addEventListener('DOMContentLoaded', function() {
    let currentCard = 0;
    let flashcards = [];

    // Format switching functionality
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the format type from button text
            const format = this.textContent.trim().toLowerCase();
            
            // Clear current result content
            const resultContent = document.querySelector('.results-content');
            resultContent.className = 'results-content';
            
            // Show appropriate content based on format
            if (format.includes('bullet')) {
                resultContent.className = 'results-content bullet-point-result';
                resultContent.innerHTML = `
                    <ul>
                        <li><strong>T Cell:</strong> มีบทบาทสำคัญในระบบภูมิคุ้มกัน โดยเฉพาะ Cytotoxic T cell (CTL หรือ CD8⁺ T cell) ทำหน้าที่ตรวจจับและทำลายเซลล์ที่ติดเชื้อไวรัสหรือเซลล์ที่มีความผิดปกติ</li>
                        <li><strong>การทำงานของ T Cell:</strong> เมื่อ CTL จับกับเซลล์เป้าหมายที่แสดง antigen ร่วมกับ MHC Class I จะกระตุ้นให้เซลล์นั้นเข้าสู่กระบวนการ apoptosis (การตายแบบมีการควบคุม)</li>
                        <li><strong>B Cell:</strong> มีบทบาทหลักในการสร้างแอนติบอดี (Antibody) เพื่อต่อต้านเชื้อโรค</li>
                        <li><strong>กระบวนการทำงาน:</strong> APC (เช่น แมคโครฟาจ) นำเสนอแอนติเจนให้กับ Helper T cell ซึ่งจะกระตุ้น B cell ให้สร้างแอนติบอดี</li>
                        <li><strong>แอนติบอดี:</strong> โปรตีนที่สร้างโดย B cell ทำหน้าที่จับกับสิ่งแปลกปลอมและช่วยกำจัดออกจากร่างกาย</li>
                    </ul>
                `;
            } else if (format.includes('mind')) {
                resultContent.className = 'results-content mind-map-result';
                resultContent.innerHTML = `
                    <div class="text-center mb-3">
                        <h4>ภูมิคุ้มกันวิทยาพื้นฐาน</h4>
                    </div>
                    <div class="central-node">ระบบภูมิคุ้มกัน</div>
                    <div class="branch-nodes">
                        <div class="branch-node">T Cell</div>
                        <div class="branch-node">B Cell</div>
                        <div class="branch-node">แอนติบอดี</div>
                        <div class="branch-node">MHC</div>
                        <div class="branch-node">การตอบสนองภูมิคุ้มกัน</div>
                        <div class="branch-node">Apoptosis</div>
                    </div>
                `;
            } else if (format.includes('flash')) {
                resultContent.className = 'results-content';
                resultContent.innerHTML = `
                    <div class="flashcards-container">
                        <div class="flashcard" data-card="0">
                            <div class="flashcard-front">
                                <div class="flashcard-question">T Cell คืออะไร และมีหน้าที่อย่างไร?</div>
                                <div class="flashcard-hint">คลิกเพื่อดูคำตอบ</div>
                                <div class="flashcard-counter">1/4</div>
                            </div>
                            <div class="flashcard-back">
                                <div class="flashcard-answer">T Cell คือเซลล์ภูมิคุ้มกันชนิดหนึ่ง โดยเฉพาะ Cytotoxic T cell (CTL หรือ CD8⁺ T cell) มีหน้าที่ตรวจจับและทำลายเซลล์ที่ติดเชื้อไวรัสหรือเซลล์ที่มีความผิดปกติ โดยการกระตุ้นให้เซลล์นั้นเข้าสู่กระบวนการ apoptosis (การตายแบบมีการควบคุม)</div>
                                <div class="flashcard-counter">1/4</div>
                            </div>
                        </div>
                        
                        <div class="flashcard hidden" data-card="1">
                            <div class="flashcard-front">
                                <div class="flashcard-question">B Cell มีบทบาทหลักอย่างไรในระบบภูมิคุ้มกัน?</div>
                                <div class="flashcard-hint">คลิกเพื่อดูคำตอบ</div>
                                <div class="flashcard-counter">2/4</div>
                            </div>
                            <div class="flashcard-back">
                                <div class="flashcard-answer">B Cell มีบทบาทหลักในการสร้างแอนติบอดี (Antibody) เพื่อต่อต้านเชื้อโรคและสิ่งแปลกปลอม B Cell จะถูกกระตุ้นโดย Helper T cell (CD4⁺ T cell) ที่ได้รับการกระตุ้นจากแอนติเจนที่นำเสนอโดย APC</div>
                                <div class="flashcard-counter">2/4</div>
                            </div>
                        </div>
                        
                        <div class="flashcard hidden" data-card="2">
                            <div class="flashcard-front">
                                <div class="flashcard-question">กระบวนการ Apoptosis คืออะไร และมีความสำคัญอย่างไร?</div>
                                <div class="flashcard-hint">คลิกเพื่อดูคำตอบ</div>
                                <div class="flashcard-counter">3/4</div>
                            </div>
                            <div class="flashcard-back">
                                <div class="flashcard-answer">Apoptosis คือกระบวนการตายของเซลล์แบบมีการควบคุม เมื่อ Cytotoxic T cell จับกับเซลล์เป้าหมาย ข้อดีของการเกิด apoptosis คือไม่ทำให้เนื้อเยื่อรอบข้างเสียหายมาก และช่วยหยุดการแพร่กระจายของไวรัสหรือเซลล์ที่ผิดปกติ</div>
                                <div class="flashcard-counter">3/4</div>
                            </div>
                        </div>
                        
                        <div class="flashcard hidden" data-card="3">
                            <div class="flashcard-front">
                                <div class="flashcard-question">แอนติบอดี (Antibody) คืออะไร และมีหน้าที่อย่างไร?</div>
                                <div class="flashcard-hint">คลิกเพื่อดูคำตอบ</div>
                                <div class="flashcard-counter">4/4</div>
                            </div>
                            <div class="flashcard-back">
                                <div class="flashcard-answer">แอนติบอดี คือโปรตีนที่สร้างโดย B Cell ทำหน้าที่จับกับแอนติเจน (สิ่งแปลกปลอม) อย่างจำเพาะ เพื่อทำให้แอนติเจนถูกกำจัดได้ง่ายขึ้น โดยอาจทำให้เกิดการรวมตัวของเชื้อโรค การยับยั้งกระบวนการสำคัญของเชื้อโรค หรือการกระตุ้นระบบคอมพลีเมนต์</div>
                                <div class="flashcard-counter">4/4</div>
                            </div>
                        </div>
                        
                        <div class="flashcard-navigation">
                            <button class="flashcard-nav-btn" id="prev-card">‹</button>
                            <button class="flashcard-nav-btn" id="reset-cards">⟲</button>
                            <button class="flashcard-nav-btn" id="next-card">›</button>
                        </div>
                    </div>
                `;
                
                // Initialize flashcard functionality after creating the HTML
                initializeFlashcards();
                
            } else if (format.includes('quiz')) {
                resultContent.className = 'results-content';
                resultContent.innerHTML = `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <h3>1. เซลล์ใดที่มีหน้าที่หลักในการสร้างแอนติบอดี?</h3>
                            <ul class="quiz-options">
                                <li class="quiz-option" data-answer="false">A. T Cell</li>
                                <li class="quiz-option" data-answer="true">B. B Cell</li>
                                <li class="quiz-option" data-answer="false">C. แมคโครฟาจ</li>
                                <li class="quiz-option" data-answer="false">D. เดนไดรติกเซลล์</li>
                            </ul>
                        </div>
                        <div class="quiz-question">
                            <h3>2. เซลล์ใดมีบทบาทในการทำลายเซลล์ติดเชื้อไวรัสโดยตรง?</h3>
                            <ul class="quiz-options">
                                <li class="quiz-option" data-answer="false">A. B Cell</li>
                                <li class="quiz-option" data-answer="false">B. Helper T Cell</li>
                                <li class="quiz-option" data-answer="true">C. Cytotoxic T Cell</li>
                                <li class="quiz-option" data-answer="false">D. เดนไดรติกเซลล์</li>
                            </ul>
                        </div>
                    </div>
                `;
                
                // Initialize quiz functionality
                initializeQuiz();
            }
        });
    });

    // Flashcard functionality
    function initializeFlashcards() {
        flashcards = document.querySelectorAll('.flashcard[data-card]');
        currentCard = 0;
        
        // Add click event to flip cards
        flashcards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
        });
        
        // Navigation buttons
        const prevBtn = document.getElementById('prev-card');
        const nextBtn = document.getElementById('next-card');
        const resetBtn = document.getElementById('reset-cards');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateCards(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateCards(1);
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                resetFlashcards();
            });
        }
        
        updateNavigationButtons();
    }
    
    function navigateCards(direction) {
        if (flashcards.length === 0) return;
        
        // Hide current card
        flashcards[currentCard].classList.add('hidden');
        flashcards[currentCard].classList.remove('flipped');
        
        // Update current card index
        currentCard += direction;
        
        // Wrap around if necessary
        if (currentCard < 0) {
            currentCard = flashcards.length - 1;
        } else if (currentCard >= flashcards.length) {
            currentCard = 0;
        }
        
        // Show new current card
        flashcards[currentCard].classList.remove('hidden');
        
        updateNavigationButtons();
    }
    
    function resetFlashcards() {
        if (flashcards.length === 0) return;
        
        // Hide all cards and remove flipped state
        flashcards.forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('flipped');
        });
        
        // Show first card
        currentCard = 0;
        flashcards[currentCard].classList.remove('hidden');
        
        updateNavigationButtons();
    }
    
    function updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-card');
        const nextBtn = document.getElementById('next-card');
        
        if (prevBtn && nextBtn && flashcards.length > 0) {
            // Enable/disable buttons based on current position
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            
            // Add visual feedback for first/last card
            if (currentCard === 0) {
                prevBtn.style.opacity = '0.5';
            } else {
                prevBtn.style.opacity = '1';
            }
            
            if (currentCard === flashcards.length - 1) {
                nextBtn.style.opacity = '0.5';
            } else {
                nextBtn.style.opacity = '1';
            }
        }
    }

    // Quiz functionality
    function initializeQuiz() {
        const quizOptions = document.querySelectorAll('.quiz-option');
        
        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove previous selections in this question
                const siblings = this.parentElement.querySelectorAll('.quiz-option');
                siblings.forEach(sibling => {
                    sibling.classList.remove('selected', 'correct', 'incorrect');
                });
                
                // Mark as selected
                this.classList.add('selected');
                
                // Check if answer is correct
                const isCorrect = this.getAttribute('data-answer') === 'true';
                
                setTimeout(() => {
                    if (isCorrect) {
                        this.classList.add('correct');
                        this.classList.remove('selected');
                    } else {
                        this.classList.add('incorrect');
                        this.classList.remove('selected');
                        
                        // Show correct answer
                        siblings.forEach(sibling => {
                            if (sibling.getAttribute('data-answer') === 'true') {
                                sibling.classList.add('correct');
                            }
                        });
                    }
                }, 500);
            });
        });
    }

    // File upload handling
    const uploadBox = document.querySelector('.upload-box');
    const fileInput = document.getElementById('file-upload');
    
    if (uploadBox && fileInput) {
        uploadBox.addEventListener('click', function() {
            fileInput.click();
        });
        
        uploadBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadBox.classList.add('border-primary');
        });
        
        uploadBox.addEventListener('dragleave', function() {
            uploadBox.classList.remove('border-primary');
        });
        
        uploadBox.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadBox.classList.remove('border-primary');
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });
        
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length) {
                handleFileUpload(fileInput.files[0]);
            }
        });
    }
    
    function handleFileUpload(file) {
        // Display file name
        const uploadText = document.querySelector('.upload-text');
        if (uploadText) {
            uploadText.textContent = `ไฟล์ที่เลือก: ${file.name}`;
        }
        
        // In a real application, you would upload the file to a server here
        // For demo purposes, we'll just simulate processing
        
        // Show loading state
        const btn = uploadBox.querySelector('.btn');
        if (btn) {
            const originalText = btn.textContent;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> กำลังประมวลผล...';
            btn.disabled = true;
            
            // Simulate processing time
            setTimeout(function() {
                // Reset button
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Show results (already displayed in our demo)
                const resultsSection = document.querySelector('.results-section');
                if (resultsSection) {
                    resultsSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }, 2000);
        }
    }
});