/* =========================================================
   FUO 100 LEVEL TEST DRILLER
   MTH 101 / PHY 101 / CHEM 101

   150 questions are generated for EACH topic.
========================================================= */


/* =========================================================
   TOPICS
========================================================= */

const topics = {

    MTH101: [

        "Sets",

        "Sequences and Series",

        "Arithmetic Progression (AP)",

        "Geometric Progression (GP)",

        "Theory of Quadratic Equations",

        "Nature of Roots",

        "Sum and Product of Roots",

        "Complex Numbers",

        "Binomial Theorem",

        "Permutations and Combinations"

    ],


    PHY101: [

        "Units and Dimensions",

        "Measurements of Fundamental Quantities",

        "Dimensions of Physical Quantities",

        "Velocity",

        "Acceleration",

        "Gravity",

        "Newton's Laws of Motion",

        "Inertia",

        "Momentum",

        "Mass and Weight",

        "Equations of Motion",

        "Conservation of Linear Momentum",

        "Coordinate System",

        "Conservation of Angular Momentum",

        "Torque and Angular Momentum",

        "Circular Motion",

        "Centripetal and Centrifugal Force"

    ],


    CHEM101: [

        "Chemical Reactions",

        "Atomic Structure and Theory",

        "Periodicity",

        "Electronic Configuration",

        "Chemical Bonding",

        "Periodic Table",

        "Thermochemistry",

        "Enthalpy and Entropy",

        "Thermodynamics"

    ]

};


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentQuestions = [];

let currentIndex = 0;

let selectedAnswers = [];

let timerInterval;

let totalSeconds = 0;

let startTime;

let finished = false;


/* =========================================================
   COURSE SELECTION
========================================================= */

const courseSelect =
    document.getElementById("course");

const topicSelect =
    document.getElementById("topic");

const practiceType =
    document.getElementById("practiceType");

const topicBox =
    document.getElementById("topicBox");


courseSelect.addEventListener("change", function () {

    const course = this.value;

    topicSelect.innerHTML =
        `<option value="">Select Topic</option>`;

    if (!course) return;

    topics[course].forEach(topic => {

        const option =
            document.createElement("option");

        option.value = topic;

        option.textContent = topic;

        topicSelect.appendChild(option);

    });

});


practiceType.addEventListener("change", function () {

    if (this.value === "random") {

        topicBox.style.display = "none";

    } else {

        topicBox.style.display = "block";

    }

});


/* =========================================================
   QUESTION OBJECT
========================================================= */

function createQuestion(
    question,
    options,
    answer,
    explanation
) {

    return {

        question: question,

        options: options,

        answer: answer,

        explanation: explanation

    };

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    return array
        .map(value => ({
            value,
            sort: Math.random()
        }))
        .sort((a,b) => a.sort - b.sort)
        .map(obj => obj.value);

}


/* =========================================================
   NUMBER FORMAT
========================================================= */

function rnd(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


function round(value, places = 2) {

    return Number(
        value.toFixed(places)
    );

}


/* =========================================================
   MTH 101 QUESTION GENERATORS
========================================================= */

function generateMTH(topic, number = 150) {

    let questions = [];


    for (let i = 0; i < number; i++) {

        let q;


        /* ---------------- SETS ---------------- */

        if (topic === "Sets") {

            const a = rnd(1,9);

            const b = rnd(10,20);

            const c = rnd(21,30);

            const correct = b - a + 1;

            q = createQuestion(

                `How many integers are contained in the set {${a}, ${a+1}, ..., ${b}}?`,

                [
                    String(correct),
                    String(correct + 1),
                    String(correct - 1),
                    String(correct + 2)
                ],

                0,

                `The number of integers from ${a} to ${b} inclusive is b − a + 1 = ${b} − ${a} + 1 = ${correct}.`

            );

        }


        /* ---------------- AP ---------------- */

        else if (
            topic === "Arithmetic Progression (AP)"
        ) {

            const first = rnd(2,15);

            const d = rnd(2,8);

            const n = rnd(5,15);

            const ans =
                first + (n - 1) * d;

            q = createQuestion(

                `Find the ${n}th term of the arithmetic progression whose first term is ${first} and common difference is ${d}.`,

                [
                    String(ans),
                    String(ans + d),
                    String(ans - d),
                    String(ans + 1)
                ],

                0,

                `Using Tₙ = a + (n − 1)d: Tₙ = ${first} + (${n} − 1)(${d}) = ${ans}.`

            );

        }


        /* ---------------- GP ---------------- */

        else if (
            topic === "Geometric Progression (GP)"
        ) {

            const a = rnd(1,5);

            const r = rnd(2,4);

            const n = rnd(3,7);

            const ans =
                a * Math.pow(r,n-1);

            q = createQuestion(

                `Find the ${n}th term of the GP with first term ${a} and common ratio ${r}.`,

                [
                    String(ans),
                    String(ans*r),
                    String(ans/r),
                    String(ans+a)
                ],

                0,

                `Using Tₙ = arⁿ⁻¹: Tₙ = ${a}(${r})ⁿ⁻¹ = ${ans}.`

            );

        }


        /* ---------------- QUADRATIC ---------------- */

        else if (
            topic === "Theory of Quadratic Equations" ||
            topic === "Nature of Roots" ||
            topic === "Sum and Product of Roots"
        ) {

            const root1 = rnd(1,10);

            const root2 = rnd(1,10);

            const b = -(root1 + root2);

            const c = root1 * root2;

            q = createQuestion(

                `For the quadratic equation x² ${b >= 0 ? "+" : ""}${b}x + ${c} = 0, find the sum of its roots.`,

                [
                    String(root1 + root2),
                    String(root1 * root2),
                    String(-(root1 + root2)),
                    String(root1 - root2)
                ],

                0,

                `For ax² + bx + c = 0, the sum of roots is −b/a. Here a = 1 and b = ${b}, so the sum is ${-(b)}.`

            );

        }


        /* ---------------- COMPLEX NUMBERS ---------------- */

        else if (
            topic === "Complex Numbers"
        ) {

            const a = rnd(1,10);

            const b = rnd(1,10);

            const c = rnd(1,10);

            const d = rnd(1,10);

            const real = a + c;

            const imag = b + d;

            q = createQuestion(

                `Simplify (${a} + ${b}i) + (${c} + ${d}i).`,

                [
                    `${real} + ${imag}i`,
                    `${real} + ${Math.abs(b-d)}i`,
                    `${a+c} + ${b*c}i`,
                    `${a-c} + ${b-d}i`
                ],

                0,

                `Add the real parts and imaginary parts separately: (${a}+${c}) + (${b}+${d})i = ${real} + ${imag}i.`

            );

        }


        /* ---------------- BINOMIAL ---------------- */

        else if (
            topic === "Binomial Theorem"
        ) {

            const n = rnd(3,6);

            const k = rnd(0,n);

            const coefficient =
                factorial(n) /
                (
                    factorial(k) *
                    factorial(n-k)
                );

            q = createQuestion(

                `What is the coefficient of the term corresponding to k = ${k} in the expansion of (x + y)^${n}?`,

                [
                    String(coefficient),
                    String(coefficient + 1),
                    String(coefficient + n),
                    String(coefficient - 1)
                ],

                0,

                `The coefficient is ⁿCₖ = ${n}!/[${k}!(${n}-${k})!] = ${coefficient}.`

            );

        }


        /* ---------------- PERMUTATION ---------------- */

        else if (
            topic === "Permutations and Combinations"
        ) {

            const n = rnd(5,9);

            const r = rnd(2,4);

            const ans =
                factorial(n) /
                factorial(n-r);

            q = createQuestion(

                `Find ${n}P${r}.`,

                [
                    String(ans),
                    String(ans/r),
                    String(ans+r),
                    String(factorial(n)/(factorial(r)*factorial(n-r)))
                ],

                0,

                `${n}P${r} = ${n}!/(${n}-${r})! = ${ans}.`

            );

        }


        /* ---------------- SEQUENCES ---------------- */

        else if (
            topic === "Sequences and Series"
        ) {

            const a = rnd(2,10);

            const d = rnd(2,6);

            const n = rnd(5,12);

            const sum =
                n / 2 *
                (2*a + (n-1)*d);

            q = createQuestion(

                `Find the sum of the first ${n} terms of an arithmetic sequence with first term ${a} and common difference ${d}.`,

                [
                    String(sum),
                    String(sum+d),
                    String(sum-d),
                    String(sum*2)
                ],

                0,

                `Sₙ = n/2[2a + (n−1)d] = ${sum}.`

            );

        }


        /* fallback */

        else {

            q = createQuestion(

                `Which of the following is a fundamental concept in ${topic}?`,

                [
                    "Mathematical reasoning",
                    "Random guessing",
                    "Ignoring definitions",
                    "None of these"
                ],

                0,

                "Understanding definitions and applying mathematical reasoning are fundamental to this topic."

            );

        }


        q.options =
            shuffle(q.options);

        /*
           Recalculate answer index after shuffling.
           Correct answer is identified by text.
        */

        const correctText =
            q.options[
                q.options.indexOf(
                    q.options[q.answer]
                )
            ];

        q.answer =
            q.options.indexOf(
                correctText
            );

        questions.push(q);

    }


    return questions;

}


/* =========================================================
   FACTORIAL
========================================================= */

function factorial(n) {

    let result = 1;

    for (
        let i = 2;
        i <= n;
        i++
    ) {

        result *= i;

    }

    return result;

}


/* =========================================================
   PHYSICS QUESTION GENERATOR
========================================================= */

function generatePHY(topic, number = 150) {

    let questions = [];


    for (let i = 0; i < number; i++) {

        let q;


        /* VELOCITY */

        if (topic === "Velocity") {

            const distance = rnd(20,200);

            const time = rnd(2,10);

            const ans =
                round(distance/time,2);

            q = createQuestion(

                `A body travels ${distance} m in ${time} s. What is its average velocity?`,

                [
                    `${ans} m/s`,
                    `${ans+2} m/s`,
                    `${distance*time} m/s`,
                    `${time/distance} m/s`
                ],

                0,

                `v = displacement/time = ${distance}/${time} = ${ans} m/s.`

            );

        }


        /* ACCELERATION */

        else if (topic === "Acceleration") {

            const u = rnd(2,15);

            const a = rnd(1,5);

            const t = rnd(2,8);

            const v = u + a*t;

            q = createQuestion(

                `A body has initial velocity ${u} m/s and accelerates at ${a} m/s² for ${t} s. Find its final velocity.`,

                [
                    `${v} m/s`,
                    `${v+a} m/s`,
                    `${u+t} m/s`,
                    `${u*a} m/s`
                ],

                0,

                `v = u + at = ${u} + (${a} × ${t}) = ${v} m/s.`

            );

        }


        /* NEWTON SECOND LAW */

        else if (
            topic === "Newton's Laws of Motion"
        ) {

            const m = rnd(2,20);

            const a = rnd(1,8);

            const F = m*a;

            q = createQuestion(

                `A ${m} kg body accelerates at ${a} m/s². Find the resultant force acting on it.`,

                [
                    `${F} N`,
                    `${F+m} N`,
                    `${a/m} N`,
                    `${m/a} N`
                ],

                0,

                `Newton's second law gives F = ma = ${m} × ${a} = ${F} N.`

            );

        }


        /* MOMENTUM */

        else if (
            topic === "Momentum"
        ) {

            const m = rnd(2,20);

            const v = rnd(2,15);

            const p = m*v;

            q = createQuestion(

                `A body of mass ${m} kg moves with velocity ${v} m/s. Find its momentum.`,

                [
                    `${p} kg m/s`,
                    `${m+v} kg m/s`,
                    `${p*2} kg m/s`,
                    `${v/m} kg m/s`
                ],

                0,

                `p = mv = ${m} × ${v} = ${p} kg m/s.`

            );

        }


        /* MASS AND WEIGHT */

        else if (
            topic === "Mass and Weight"
        ) {

            const m = rnd(2,20);

            const g = 9.8;

            const W =
                round(m*g,1);

            q = createQuestion(

                `What is the weight of a ${m} kg object on Earth? Take g = 9.8 m/s².`,

                [
                    `${W} N`,
                    `${m} N`,
                    `${W/2} N`,
                    `${m+9.8} N`
                ],

                0,

                `Weight W = mg = ${m} × 9.8 = ${W} N.`

            );

        }


        /* EQUATIONS OF MOTION */

        else if (
            topic === "Equations of Motion"
        ) {

            const u = rnd(0,10);

            const a = rnd(1,5);

            const t = rnd(2,8);

            const s =
                round(
                    u*t +
                    0.5*a*t*t,
                    2
                );

            q = createQuestion(

                `A body starts with velocity ${u} m/s and accelerates at ${a} m/s² for ${t} s. Find its displacement.`,

                [
                    `${s} m`,
                    `${u*t} m`,
                    `${a*t} m`,
                    `${s+a} m`
                ],

                0,

                `s = ut + ½at² = (${u}×${t}) + ½(${a})(${t}²) = ${s} m.`

            );

        }


        /* GRAVITY */

        else if (
            topic === "Gravity"
        ) {

            const t = rnd(1,6);

            const g = 9.8;

            const v =
                round(g*t,2);

            q = createQuestion(

                `An object falls freely from rest for ${t} s. Find its velocity just before the end of the ${t} s. Take g = 9.8 m/s².`,

                [
                    `${v} m/s`,
                    `${g+t} m/s`,
                    `${t/g} m/s`,
                    `${v/2} m/s`
                ],

                0,

                `For free fall, v = gt = 9.8 × ${t} = ${v} m/s.`

            );

        }


        /* CENTRIPETAL */

        else if (
            topic === "Centripetal and Centrifugal Force" ||
            topic === "Circular Motion"
        ) {

            const m = rnd(2,10);

            const v = rnd(3,12);

            const r = rnd(2,8);

            const F =
                round(
                    m*v*v/r,
                    2
                );

            q = createQuestion(

                `A ${m} kg object moves in a circle of radius ${r} m at ${v} m/s. Find the centripetal force.`,

                [
                    `${F} N`,
                    `${m*v/r} N`,
                    `${m*v} N`,
                    `${v*v/r} N`
                ],

                0,

                `Fᶜ = mv²/r = (${m}×${v}²)/${r} = ${F} N.`

            );

        }


        /* TORQUE */

        else if (
            topic === "Torque and Angular Momentum"
        ) {

            const F = rnd(5,30);

            const r = rnd(1,10);

            const torque = F*r;

            q = createQuestion(

                `A force of ${F} N acts perpendicularly at a distance of ${r} m from a pivot. Find the torque.`,

                [
                    `${torque} Nm`,
                    `${F+r} Nm`,
                    `${F/r} Nm`,
                    `${r/F} Nm`
                ],

                0,

                `τ = rF = ${r} × ${F} = ${torque} Nm.`

            );

        }


        /* LINEAR MOMENTUM */

        else if (
            topic === "Conservation of Linear Momentum"
        ) {

            const m1 = rnd(2,8);

            const v1 = rnd(2,8);

            const m2 = rnd(2,8);

            const v2 = rnd(1,5);

            const total =
                m1*v1 + m2*v2;

            q = createQuestion(

                `Two bodies have momenta ${m1}×${v1} and ${m2}×${v2} kg m/s in the same direction. Find their total momentum.`,

                [
                    `${total} kg m/s`,
                    `${m1*v1} kg m/s`,
                    `${m2*v2} kg m/s`,
                    `${total/2} kg m/s`
                ],

                0,

                `Total momentum = p₁ + p₂ = (${m1}×${v1}) + (${m2}×${v2}) = ${total} kg m/s.`

            );

        }


        /* DIMENSIONS */

        else if (
            topic === "Units and Dimensions" ||
            topic === "Dimensions of Physical Quantities"
        ) {

            q = createQuestion(

                "What is the dimensional formula for velocity?",

                [
                    "LT⁻¹",
                    "LT⁻²",
                    "MLT⁻¹",
                    "ML²T⁻²"
                ],

                0,

                "Velocity = displacement/time. Displacement has dimension L and time has dimension T, therefore velocity has dimension LT⁻¹."

            );

        }


        /* DEFAULT PHYSICS */

        else {

            q = createQuestion(

                `Which branch of physics is most directly concerned with ${topic}?`,

                [
                    "Classical mechanics",
                    "Organic chemistry",
                    "Botany",
                    "Geology only"
                ],

                0,

                `${topic} is studied as part of the relevant principles of classical physics and mechanics.`

            );

        }


        questions.push(q);

    }


    return questions;

}


/* =========================================================
   CHEMISTRY QUESTION GENERATOR
========================================================= */

function generateCHEM(topic, number = 150) {

    let questions = [];


    for (let i = 0; i < number; i++) {

        let q;


        if (
            topic === "Atomic Structure and Theory"
        ) {

            const proton = rnd(1,20);

            q = createQuestion(

                `An atom has ${proton} protons and is electrically neutral. How many electrons does it contain?`,

                [
                    String(proton),
                    String(proton+1),
                    String(proton-1),
                    String(proton*2)
                ],

                0,

                "A neutral atom has equal numbers of protons and electrons."

            );

        }


        else if (
            topic === "Electronic Configuration"
        ) {

            q = createQuestion(

                "What is the maximum number of electrons that can occupy the first shell?",

                [
                    "2",
                    "8",
                    "18",
                    "32"
                ],

                0,

                "The first shell has n = 1, so its maximum capacity is 2n² = 2 electrons."

            );

        }


        else if (
            topic === "Periodicity"
        ) {

            q = createQuestion(

                "Which property generally increases across a period from left to right?",

                [
                    "Effective nuclear charge",
                    "Atomic radius",
                    "Number of occupied shells",
                    "Metallic character"
                ],

                0,

                "Effective nuclear charge generally increases across a period because proton number increases while shielding changes relatively little."

            );

        }


        else if (
            topic === "Chemical Bonding"
        ) {

            q = createQuestion(

                "Which type of bond is formed mainly by transfer of electrons from one atom to another?",

                [
                    "Ionic bond",
                    "Covalent bond",
                    "Metallic bond",
                    "Hydrogen bond"
                ],

                0,

                "An ionic bond forms through electron transfer followed by electrostatic attraction between oppositely charged ions."

            );

        }


        else if (
            topic === "Periodic Table"
        ) {

            q = createQuestion(

                "Elements in the same group of the periodic table generally have similar:",

                [
                    "Valence-electron arrangements",
                    "Mass numbers",
                    "Number of neutrons",
                    "Atomic masses"
                ],

                0,

                "Elements in the same group generally have related valence-electron configurations, giving them similar chemical properties."

            );

        }


        else if (
            topic === "Thermochemistry"
        ) {

            q = createQuestion(

                "A reaction that releases heat to the surroundings is described as:",

                [
                    "Exothermic",
                    "Endothermic",
                    "Isothermal only",
                    "Adiabatic only"
                ],

                0,

                "An exothermic reaction releases heat and has a negative enthalpy change under constant pressure."

            );

        }


        else if (
            topic === "Enthalpy and Entropy"
        ) {

            const reactants = rnd(100,500);

            const products = rnd(50,450);

            const deltaH =
                products - reactants;

            q = createQuestion(

                `If the enthalpy of the reactants is ${reactants} kJ and the enthalpy of the products is ${products} kJ, calculate ΔH.`,

                [
                    `${deltaH} kJ`,
                    `${reactants-products} kJ`,
                    `${reactants+products} kJ`,
                    `${products/reactants} kJ`
                ],

                0,

                `ΔH = H(products) − H(reactants) = ${products} − ${reactants} = ${deltaH} kJ.`

            );

        }


        else if (
            topic === "Thermodynamics"
        ) {

            q = createQuestion(

                "Which law of thermodynamics introduces the concept of conservation of energy?",

                [
                    "First law",
                    "Second law",
                    "Third law",
                    "Zeroth law"
                ],

                0,

                "The first law of thermodynamics is an expression of energy conservation."

            );

        }


        else {

            q = createQuestion(

                `Which statement is most directly associated with ${topic}?`,

                [
                    "It involves fundamental chemical principles",
                    "It is unrelated to matter",
                    "It only concerns mechanics",
                    "It only concerns electricity"
                ],

                0,

                `${topic} is studied as part of the fundamental principles of chemistry.`

            );

        }


        questions.push(q);

    }


    return questions;

}


/* =========================================================
   GET QUESTIONS
========================================================= */

function getQuestions(course, topic) {

    if (course === "MTH101") {

        return generateMTH(topic,150);

    }

    if (course === "PHY101") {

        return generatePHY(topic,150);

    }

    if (course === "CHEM101") {

        return generateCHEM(topic,150);

    }

    return [];

}


/* =========================================================
   START TEST
========================================================= */

document
    .getElementById("startBtn")
    .addEventListener("click", startTest);


function startTest() {

    const course =
        courseSelect.value;

    const type =
        practiceType.value;

    const topic =
        topicSelect.value;

    const number =
        Number(
            document.getElementById(
                "questionCount"
            ).value
        );

    const minutes =
        Number(
            document.getElementById(
                "timeLimit"
            ).value
        );


    if (!course) {

        alert("Please select a course.");

        return;

    }


    if (
        type === "topic" &&
        !topic
    ) {

        alert("Please select a topic.");

        return;

    }


    if (
        number < 1 ||
        number > 150
    ) {

        alert(
            "Choose between 1 and 150 questions."
        );

        return;

    }


    let pool;


    if (type === "random") {

        pool = [];

        topics[course].forEach(t => {

            pool.push(
                ...getQuestions(course,t)
            );

        });

    } else {

        pool =
            getQuestions(course,topic);

    }


    pool =
        shuffle(pool);


    currentQuestions =
        pool.slice(0,number);


    selectedAnswers =
        new Array(
            currentQuestions.length
        ).fill(null);


    currentIndex = 0;

    finished = false;

    totalSeconds =
        minutes * 60;

    startTime =
        Date.now();


    document
        .getElementById("homePage")
        .classList.add("hidden");


    document
        .getElementById("resultPage")
        .classList.add("hidden");


    document
        .getElementById("correctionPage")
        .classList.add("hidden");


    document
        .getElementById("historyPage")
        .classList.add("hidden");


    document
        .getElementById("quizPage")
        .classList.remove("hidden");


    document
        .getElementById("quizCourse")
        .textContent = course;


    document
        .getElementById("quizTopic")
        .textContent =
            type === "random"
            ? "Random Topics"
            : topic;


    document
        .getElementById("totalQuestions")
        .textContent =
            currentQuestions.length;


    startTimer();

    showQuestion();

}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    const q =
        currentQuestions[currentIndex];


    document
        .getElementById("questionNumber")
        .textContent =
            currentIndex + 1;


    document
        .getElementById("questionText")
        .textContent =
            q.question;


    const options =
        document.getElementById("options");


    options.innerHTML = "";


    q.options.forEach(
        (option,index) => {

            const div =
                document.createElement("div");

            div.className = "option";

            div.textContent =
                `${String.fromCharCode(65+index)}. ${option}`;


            if (
                selectedAnswers[currentIndex]
                === index
            ) {

                div.classList.add("selected");

            }


            div.addEventListener(
                "click",
                () => {

                    selectedAnswers[
                        currentIndex
                    ] = index;

                    showQuestion();

                }
            );


            options.appendChild(div);

        }
    );


    const percentage =
        (
            (currentIndex + 1)
            /
            currentQuestions.length
        ) * 100;


    document
        .getElementById("progressBar")
        .style.width =
            `${percentage}%`;


    document
        .getElementById("previousBtn")
        .disabled =
            currentIndex === 0;


    if (
        currentIndex ===
        currentQuestions.length - 1
    ) {

        document
            .getElementById("nextBtn")
            .classList.add("hidden");


        document
            .getElementById("submitBtn")
            .classList.remove("hidden");

    } else {

        document
            .getElementById("nextBtn")
            .classList.remove("hidden");


        document
            .getElementById("submitBtn")
            .classList.add("hidden");

    }

}


/* =========================================================
   NEXT
========================================================= */

document
    .getElementById("nextBtn")
    .addEventListener(
        "click",
        () => {

            if (
                currentIndex <
                currentQuestions.length - 1
            ) {

                currentIndex++;

                showQuestion();

            }

        }
    );


/* =========================================================
   PREVIOUS
========================================================= */

document
    .getElementById("previousBtn")
    .addEventListener(
        "click",
        () => {

            if (currentIndex > 0) {

                currentIndex--;

                showQuestion();

            }

        }
    );


/* =========================================================
   SUBMIT
========================================================= */

document
    .getElementById("submitBtn")
    .addEventListener(
        "click",
        () => {

            if (
                !confirm(
                    "Are you sure you want to submit?"
                )
            ) {

                return;

            }

            finishTest();

        }
    );


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    clearInterval(timerInterval);

    updateTimer();


    timerInterval =
        setInterval(
            () => {

                totalSeconds--;

                updateTimer();


                if (
                    totalSeconds <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    alert(
                        "Time is up!"
                    );

                    finishTest();

                }

            },
            1000
        );

}


function updateTimer() {

    const minutes =
        Math.floor(
            totalSeconds / 60
        );

    const seconds =
        totalSeconds % 60;


    document
        .getElementById("timer")
        .textContent =
            `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


/* =========================================================
   FINISH TEST
========================================================= */

function finishTest() {

    if (finished) return;

    finished = true;

    clearInterval(timerInterval);


    let correct = 0;


    currentQuestions.forEach(
        (q,index) => {

            if (
                selectedAnswers[index]
                === q.answer
            ) {

                correct++;

            }

        }
    );


    const total =
        currentQuestions.length;


    const percentage =
        Math.round(
            (correct / total) * 100
        );


    const wrong =
        total - correct;


    const timeUsed =
        formatTime(
            (
                Date.now()
                - startTime
            ) / 1000
        );


    document
        .getElementById("quizPage")
        .classList.add("hidden");


    document
        .getElementById("resultPage")
        .classList.remove("hidden");


    document
        .getElementById("finalPercentage")
        .textContent =
            percentage + "%";


    document
        .getElementById("finalScore")
        .textContent =
            `${correct} / ${total}`;


    document
        .getElementById("correctAnswers")
        .textContent =
            correct;


    document
        .getElementById("wrongAnswers")
        .textContent =
            wrong;


    document
        .getElementById("timeUsed")
        .textContent =
            timeUsed;


    let message;


    if (percentage >= 80) {

        message =
            "Excellent work. Keep practicing and maintain this standard.";

    } else if (percentage >= 60) {

        message =
            "Good performance. Review your corrections and strengthen weak areas.";

    } else if (percentage >= 40) {

        message =
            "You are making progress. Review the corrections and practice again.";

    } else {

        message =
            "Keep studying. Use the corrections carefully and try the topic again.";

    }


    document
        .getElementById("resultMessage")
        .textContent =
            message;


    savePerformance(
        percentage,
        correct,
        total,
        timeUsed
    );

    updatePerformance();

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

    seconds =
        Math.floor(seconds);

    const minutes =
        Math.floor(seconds / 60);

    const sec =
        seconds % 60;

    return `${minutes}:${String(sec).padStart(2,"0")}`;

}


/* =========================================================
   CORRECTIONS
========================================================= */

function showCorrections() {

    document
        .getElementById("resultPage")
        .classList.add("hidden");


    document
        .getElementById("correctionPage")
        .classList.remove("hidden");


    const list =
        document.getElementById(
            "correctionList"
        );


    list.innerHTML = "";


    currentQuestions.forEach(
        (q,index) => {

            const item =
                document.createElement("div");

            item.className =
                "correction-item";


            const userAnswer =
                selectedAnswers[index];


            const correct =
                userAnswer === q.answer;


            item.innerHTML = `

                <h3>
                    Question ${index + 1}
                </h3>

                <p>
                    <strong>
                        ${q.question}
                    </strong>
                </p>

                <div class="${correct ? "correct" : "wrong"}">

                    ${
                        correct
                        ? "✓ Correct"
                        : "✗ Incorrect"
                    }

                    <br>

                    Your answer:
                    ${
                        userAnswer === null
                        ? "Not answered"
                        : q.options[userAnswer]
                    }

                </div>


                <div class="correct">

                    <strong>
                        Correct answer:
                    </strong>

                    ${q.options[q.answer]}

                </div>


                <div class="explanation">

                    <strong>
                        Explanation:
                    </strong>

                    <br>

                    ${q.explanation}

                </div>

            `;


            list.appendChild(item);

        }
    );

}


/* =========================================================
   SAVE PERFORMANCE
========================================================= */

function savePerformance(
    percentage,
    correct,
    total,
    time
) {

    const history =
        JSON.parse(
            localStorage.getItem(
                "fuoPerformance"
            )
        ) || [];


    history.push({

        date:
            new Date().toLocaleString(),

        percentage,

        correct,

        total,

        time

    });


    localStorage.setItem(
        "fuoPerformance",
        JSON.stringify(history)
    );

}


/* =========================================================
   PERFORMANCE
========================================================= */

function updatePerformance() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "fuoPerformance"
            )
        ) || [];


    document
        .getElementById("testsTaken")
        .textContent =
            history.length;


    if (!history.length) {

        return;

    }


    const average =
        Math.round(
            history.reduce(
                (sum,test) =>
                    sum + test.percentage,
                0
            )
            /
            history.length
        );


    const best =
        Math.max(
            ...history.map(
                test =>
                    test.percentage
            )
        );


    document
        .getElementById("averageScore")
        .textContent =
            average + "%";


    document
        .getElementById("bestScore")
        .textContent =
            best + "%";

}


updatePerformance();


/* =========================================================
   HISTORY
========================================================= */

function showHistory() {

    document
        .getElementById("homePage")
        .classList.add("hidden");


    document
        .getElementById("historyPage")
        .classList.remove("hidden");


    const history =
        JSON.parse(
            localStorage.getItem(
                "fuoPerformance"
            )
        ) || [];


    const list =
        document.getElementById(
            "historyList"
        );


    list.innerHTML = "";


    if (!history.length) {

        list.innerHTML =
            "<p>No tests have been completed yet.</p>";

        return;

    }


    history
        .slice()
        .reverse()
        .forEach(
            (test,index) => {

                const div =
                    document.createElement("div");

                div.className =
                    "history-item";


                div.innerHTML = `

                    <div>

                        <strong>
                            Test ${history.length-index}
                        </strong>

                        <br>

                        <small>
                            ${test.date}
                        </small>

                    </div>


                    <div>

                        <strong>
                            ${test.percentage}%
                        </strong>

                        <br>

                        ${test.correct}/${test.total}

                    </div>

                `;


                list.appendChild(div);

            }
        );

}


/* =========================================================
   HOME
========================================================= */

function goHome() {

    clearInterval(timerInterval);


    document
        .getElementById("quizPage")
        .classList.add("hidden");


    document
        .getElementById("resultPage")
        .classList.add("hidden");


    document
        .getElementById("correctionPage")
        .classList.add("hidden");


    document
        .getElementById("historyPage")
        .classList.add("hidden");


    document
        .getElementById("homePage")
        .classList.remove("hidden");


    updatePerformance();

}