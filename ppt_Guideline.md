**Unified Frontend Design Guideline: Interactive Web Presentation**

---

### **Core Principles**

1. **Readability:** Write code and content so that it is clear and easy to understand.
2. **Predictability:** Ensure that the behavior of code can be predicted solely from its name, parameters, and context.
3. **Cohesion:** Group related code together and design modules to have a clear, single purpose.
4. **Coupling:** Minimize dependencies between different parts of the codebase to enhance maintainability.

---

## 1. Readability

Increases the clarity of code and content, helping learners focus easily on the material and developers to understand the code effortlessly.

### **Rule: Clear Separation of Content, Style, and Logic**

**Reasoning:**

- Clearly defines the role of each file by separating concerns (`index.html` for structure, `styles.css` for design, `script.js` for behavior).
- Reduces cognitive load and significantly improves maintainability by shortening the time it takes to find and modify specific parts of the code.

### Recommended Pattern:

**`index.html` (Containing only structure and content)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- ... meta tags ... -->
    <title>Interactive Presentation</title>
    <!-- Link to CSS and external libraries -->
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="<https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css>">
</head>
<body>
    <div id="presentation-container">
        <section class="slide" data-slide-id="0">
            <h1>Presentation Title</h1>
        </section>
        <section class="slide" data-slide-id="1">
            <h2>Learning Objectives</h2>
            <!-- ... content ... -->
        </section>
        <!-- ... more slides ... -->
    </div>
    <!-- Link scripts at the end of the body -->
    <script src="script.js"></script>
</body>
</html>

```

`styles.css` and `script.js` contain all their respective related code in their own files.

### **Rule: Use Named Constants Instead of Magic Numbers**

**Reasoning:**

- Improves clarity by giving semantic meaning to unexplained values (magic numbers/colors).
- Defining the design system (colors, font sizes, spacing, etc.) as CSS variables makes it easy to maintain consistency and change the overall theme.

### Recommended Pattern (`styles.css`):

```css
:root {
    /* Color Palette (Dark Mode) */
    --bg-dark: #121212;
    --bg-card: #1E1E1E;
    --text-primary: #E0E0E0;
    --text-secondary: #B0B0B0;
    --accent-blue: #2979FF;
    --border-color: #333333;

    /* Typography */
    --font-main: 'Pretendard', sans-serif;
    --font-code: 'JetBrains Mono', monospace;

    /* Transitions */
    --transition-speed: 300ms;
}

body {
    background-color: var(--bg-dark);
    color: var(--text-primary);
    font-family: var(--font-main);
}

.card {
    background-color: var(--bg-card);
    transition: transform var(--transition-speed) ease;
}

```

### **Rule: Build a Highly Readable Typography System**

**Reasoning:**

- Clearly establishes the content hierarchy, aiding the learner's information acquisition.
- Differentiating fonts for body text and code significantly improves readability when dealing with technical content.

### Recommended Pattern (`styles.css`):

```css
/* Body text */
body, h1, h2, h3, p, li {
    font-family: var(--font-main);
}

/* Code blocks and inline code */
pre, code {
    font-family: var(--font-code);
    background-color: #282c34; /* Code block background color */
    padding: 0.2em 0.4em;
    border-radius: 4px;
}

```

### **Rule: Clarify Meaning Through Icons**

**Reasoning:**

- Helps with intuitive understanding by using visual icons to emphasize nuances or key points that are difficult to convey with text alone.
- Naturally guides the eye to important elements, increasing learning efficiency.

### Recommended Pattern (`index.html`):

```html
<!-- Use an icon in the slide title -->
<h2><i class="fas fa-bullseye"></i> Learning Objectives</h2>

<ul>
    <!-- Use icons for key items -->
    <li><i class="fa-solid fa-lightbulb"></i> Understand Core Concept A</li>
    <li><i class="fa-solid fa-gears"></i> Visualize Working Principle B</li>
</ul>

```

---

## 2. Predictability

Ensures that the behavior and flow of code and content can be easily predicted by both users and developers.

### **Rule: Encapsulate Presentation State and Behavior in a Class**

**Reasoning:**

- Encapsulating all presentation state (e.g., current slide number) and actions (`next`, `prev`, `cleanup`) into a single `PresentationController` class makes the code's behavior predictable.
- By explicitly clearing running animations (`setTimeout`, etc.) in a `cleanup` method when leaving a slide, it prevents the unpredictable side effect of one slide's behavior affecting another.

### Recommended Pattern (`script.js`):

```jsx
class PresentationController {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.slides = Array.from(this.container.children);
        this.currentSlideIndex = 0;
        this.activeTimers = []; // Manage active timers

        this.init();
    }

    init() {
        this.updateSlideVisibility();
        // Initial setup, such as keyboard event listeners
    }

    goTo(index) {
        if (index < 0 || index >= this.slides.length) return;

        this.clearAnimations(); // Clean up previous slide's animations
        this.currentSlideIndex = index;
        this.updateSlideVisibility();
        this.runSlideAnimations(this.currentSlideIndex); // Run new slide's animations
    }

    next() { this.goTo(this.currentSlideIndex + 1); }
    prev() { this.goTo(this.currentSlideIndex - 1); }

    updateSlideVisibility() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlideIndex);
        });
    }

    // Clear all timers (setTimeout, setInterval)
    clearAnimations() {
        this.activeTimers.forEach(timerId => clearTimeout(timerId));
        this.activeTimers = [];
        // Add logic to remove dynamically created SVG/DOM elements
    }

    // Run necessary animations for the current slide
    runSlideAnimations(index) {
        const slideId = this.slides[index].dataset.slideId;
        if (slideId === 'convolution-demo') {
            this.createConvolutionAnimation();
        }
    }

    // Example: Create convolution animation
    createConvolutionAnimation() {
        // ... dynamic SVG/DOM creation logic ...
        const timer = setTimeout(() => { /* ... */ }, 500);
        this.activeTimers.push(timer); // Store timer ID
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PresentationController('#presentation-container');
});

```

### **Rule: Structure Content Based on an Educational Flow**

**Reasoning:**

- A logical and predictable structure, such as 'Problem Statement → Solution Proposal → In-depth Analysis → Summary,' makes learners anticipate what comes next, increasing their engagement.
- A predictable flow helps learners build knowledge systematically. If necessary, add, delete, or reorder slides to strengthen this flow.

### Recommended Pattern (Planning slide order):

1. **Slide 1: Problem Statement** - "Why does the performance of conventional deep neural networks degrade as they get deeper?"
2. **Slide 2: Solution Proposal** - "ResNet solves this problem with 'Skip Connections'."
3. **Slide 3: Concept Visualization (Before)** - Information flow without a skip connection (blurring effect).
4. **Slide 4: Concept Visualization (After)** - Information flow with a skip connection (SVG animation showing clear data transmission). (Add a Before & After comparison slide).
5. **Slide 5: In-depth Analysis** - Mathematical principles and code examples of skip connections.
6. **Slide 6: Summary and Review** - Summary of key concepts and a quiz.

---

## 3. Cohesion

Groups related code and resources together to increase management efficiency and ensures each module has a single, clear responsibility.

### **Rule: Design UI Elements as Reusable Components**

**Reasoning:**

- Increases cohesion by grouping related HTML structure and CSS styles into a single 'component' concept (e.g., `.card`, `.progress-bar`).
- Makes it easy to apply a consistent design, and modifications to a component are easily reflected throughout the system.

### Recommended Pattern (`styles.css`):

```css
/* Card Component: Grouping related styles in one place */
.card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Progress Bar Component */
.progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background-color: var(--accent-blue);
    width: 0%; /* Controlled by JS */
    transition: width var(--transition-speed) ease-out;
}

```

### **Rule: Maintain High Cohesion in Concept Visualization Logic**

**Reasoning:**

- When implementing complex visual animations (e.g., convolution), maximize cohesion by grouping all related DOM/SVG creation, styling, and animation control logic within a specific function in `script.js` (e.g., `createConvolutionAnimation`).
- Leaving only an empty container (`<div>`) in the HTML where the visualization will be displayed separates structure from behavior and allows animation logic to be managed in one place.

### Recommended Pattern:

**`index.html` (Simple Placeholder)**

```html
<section class="slide" data-slide-id="convolution-demo">
    <h2>How Convolution Works</h2>
    <div id="convolution-visualizer"></div> <!-- Area where animation will be drawn -->
</section>

```

**`script.js` (Cohesive Animation Logic)**

```jsx
// Can be included within the PresentationController class
createConvolutionAnimation() {
    const visualizer = document.getElementById('convolution-visualizer');
    visualizer.innerHTML = ''; // Clear previous content

    // Create all elements like input grid, filter, output grid with JS
    const inputGrid = this.createGrid('input');
    const filter = this.createFilter();
    const outputGrid = this.createGrid('output');

    visualizer.append(inputGrid, filter, outputGrid);

    // Animation logic that sequentially shows the filter moving and calculating
    // All logic is self-contained within this function
    let step = 0;
    const animateStep = () => {
        if (step > 8) return;
        // ... update filter position, calculate and display output value ...
        const timer = setTimeout(animateStep, 1000);
        this.activeTimers.push(timer); // Manage timer
        step++;
    };
    animateStep();
}

```

---

## 4. Coupling

Minimizes the impact that different parts of the code have on each other, preventing a change in one part from causing unexpected problems in another.

### **Rule: Separate State and Presentation Using CSS Transitions**

**Reasoning:**

- Separates roles by having JavaScript control only the 'state' (e.g., adding/removing an `.active` class), while CSS (`transition`, `transform`, `opacity`) handles the actual visual changes (animations).
- This reduces coupling between JavaScript logic and CSS styling, improving the performance and maintainability of animations.

### Recommended Pattern:

**`styles.css` (Defining Presentation)**

```css
.slide {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity var(--transition-speed) ease-in-out,
                transform var(--transition-speed) ease-in-out;
    pointer-events: none; /* Prevent clicks on inactive slides */
}

.slide.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto; /* Allow interactions on active slide */
}

```

**`script.js` (Controlling State)**

```jsx
// Inside the PresentationController.updateSlideVisibility() method
updateSlideVisibility() {
    this.slides.forEach((slide, index) => {
        // JS is only responsible for toggling the class
        slide.classList.toggle('active', index === this.currentSlideIndex);
    });
}

```

### **Rule: Minimize Coupling Between HTML and Logic Through Dynamic Content Creation**

**Reasoning:**

- Instead of hardcoding the SVG code for complex animations (e.g., ResNet's skip connection path) in HTML, generate and inject it dynamically with JavaScript.
- This allows `index.html` to focus solely on the semantic structure of the content, making it fully decoupled from complex visual presentation logic. The HTML file remains concise, and the animation logic can be modified and managed independently in `script.js`.

### Recommended Pattern:

**`index.html` (Minimal Structure)**

```html
<section class="slide" data-slide-id="resnet-demo">
    <h2>ResNet's Skip Connection</h2>
    <div id="resnet-visualizer-container">
        <!-- SVG path is dynamically generated by JS -->
    </div>
</section>

```

**`script.js` (Dynamic SVG Creation Logic)**

```jsx
createResNetAnimation() {
    const container = document.getElementById('resnet-visualizer-container');
    container.innerHTML = '';

    const svgNS = "<http://www.w3.org/2000/svg>";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 400 200");

    // Main path
    const mainPath = document.createElementNS(svgNS, "path");
    mainPath.setAttribute("d", "M 50 100 H 350");
    mainPath.setAttribute("class", "path-main");

    // Skip connection path (curve)
    const skipPath = document.createElementNS(svgNS, "path");
    skipPath.setAttribute("d", "M 50 100 Q 200 20, 350 100");
    skipPath.setAttribute("class", "path-skip");

    // Set properties for stroke-dashoffset animation
    const length = skipPath.getTotalLength();
    skipPath.style.strokeDasharray = length;
    skipPath.style.strokeDashoffset = length;

    svg.append(mainPath, skipPath);
    container.append(svg);

    // Run animation when slide becomes active
    setTimeout(() => {
        skipPath.style.transition = 'stroke-dashoffset 2s ease-in-out';
        skipPath.style.strokeDashoffset = '0';
    }, 500);
}

```