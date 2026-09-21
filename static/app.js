const heartRateHistory = [];
const fatigueHistory = [];
const recoveryHistory = [];
const trainingLoadHistory = [];
const riskHistory = [];
const measurementHistory = [];


/* ==========================================
   HELPERS
========================================== */

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


function setWidth(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.style.width =
            `${clamp(value, 0, 100)}%`;
    }
}


/* ==========================================
   SENSOR DATA
========================================== */

function generateSensorData() {

    return {

        heartRate:
            Math.floor(Math.random() * 45) + 75,

        fatigue:
            Math.floor(Math.random() * 45) + 45,

        recovery:
            Math.floor(Math.random() * 45) + 40,

        trainingLoad:
            Math.floor(Math.random() * 40) + 55

    };

}


/* ==========================================
   RISK CALCULATION
========================================== */

function calculateRisk(data) {

    let risk = 0;


    if (data.heartRate > 100) {
        risk += 25;
    }


    if (data.fatigue > 70) {
        risk += 30;
    }


    if (data.recovery < 50) {
        risk += 25;
    }


    if (data.trainingLoad > 80) {
        risk += 20;
    }


    return clamp(
        risk,
        0,
        100
    );

}


/* ==========================================
   CONDITION
========================================== */

function getCondition(risk) {

    if (risk <= 30) {
        return "Low";
    }


    if (risk <= 60) {
        return "Moderate";
    }


    return "High";

}


/* ==========================================
   AI DECISION
========================================== */

function getAIDecision(data, risk) {

    const condition =
        getCondition(risk);


    if (condition === "High") {

        return {

            title:
                "Recovery recommended",

            text:
                "Current indicators suggest elevated training stress. The session should be adapted to prioritize recovery.",

            intensity:
                "LOW",

            recommendation:
                "Reduce training intensity and focus on mobility, technique or recovery work.",

            schedule:
                "High-risk indicators detected. Training schedule has been adapted.",

            reasons: {

                fatigue:
                    data.fatigue > 70
                        ? "Elevated fatigue"
                        : "Fatigue within range",

                recovery:
                    data.recovery < 50
                        ? "Low recovery"
                        : "Recovery within range",

                training:
                    data.trainingLoad > 80
                        ? "High training load"
                        : "Training load within range",

                heart:
                    data.heartRate > 100
                        ? "Elevated heart rate"
                        : "Heart rate within range"

            }

        };

    }


    if (condition === "Moderate") {

        return {

            title:
                "Train with caution",

            text:
                "Some indicators are elevated. A controlled session with close monitoring is recommended.",

            intensity:
                "MODERATE",

            recommendation:
                "Keep intensity controlled and add recovery time if fatigue increases.",

            schedule:
                "Moderate-risk indicators detected. Training intensity is being monitored.",

            reasons: {

                fatigue:
                    data.fatigue > 70
                        ? "Elevated fatigue"
                        : "Fatigue acceptable",

                recovery:
                    data.recovery < 50
                        ? "Recovery needs attention"
                        : "Recovery acceptable",

                training:
                    data.trainingLoad > 80
                        ? "High training load"
                        : "Training load acceptable",

                heart:
                    data.heartRate > 100
                        ? "Elevated heart rate"
                        : "Heart rate acceptable"

            }

        };

    }


    return {

        title:
            "Ready for planned training",

        text:
            "Current physical indicators are relatively stable and support the planned session.",

        intensity:
            "NORMAL",

        recommendation:
            "Continue with the planned session and maintain normal recovery habits.",

        schedule:
            "Stable indicators detected. Planned schedule can continue.",

        reasons: {

            fatigue:
                "Fatigue within range",

            recovery:
                "Recovery within range",

            training:
                "Training load within range",

            heart:
                "Heart rate within range"

        }

    };

}


/* ==========================================
   AI COACH
========================================== */

function updateAICoach(data, risk) {

    const decision =
        getAIDecision(
            data,
            risk
        );


    setText(
        "ai-decision-title",
        decision.title
    );


    setText(
        "ai-decision-text",
        decision.text
    );


    setText(
        "ai-intensity",
        decision.intensity
    );


    setText(
        "ai-recommendation",
        decision.recommendation
    );


    setText(
        "reason-fatigue",
        decision.reasons.fatigue
    );


    setText(
        "reason-recovery",
        decision.reasons.recovery
    );


    setText(
        "reason-training",
        decision.reasons.training
    );


    setText(
        "reason-heart",
        decision.reasons.heart
    );


    setText(
        "recommended-intensity",
        decision.intensity
    );


    setText(
        "schedule-note",
        decision.schedule
    );


    setText(
        "main-training-name",

        risk > 60
            ? "Recovery Session"
            : risk > 30
                ? "Controlled Training"
                : "Planned Training"

    );


    setText(
        "main-training-description",
        decision.recommendation
    );


    setText(
        "recovery-session-status",

        risk > 60
            ? "Recommended"
            : "Available"

    );

}


/* ==========================================
   LIVE MONITORING
========================================== */

function updateMonitoring(data, risk) {

    const condition =
        getCondition(risk);


    setText(
        "monitor-heart-rate",
        `${data.heartRate} BPM`
    );


    setText(
        "monitor-heart-status",

        data.heartRate > 100
            ? "Elevated"
            : "Normal"

    );


    setText(
        "monitor-chart-value",
        `${data.heartRate} BPM`
    );


    setText(
        "monitor-fatigue",
        `${data.fatigue}%`
    );


    setWidth(
        "fatigue-progress",
        data.fatigue
    );


    setText(
        "monitor-fatigue-status",

        data.fatigue > 70
            ? "High"
            : "Moderate"

    );


    setText(
        "monitor-recovery",
        `${data.recovery}%`
    );


    setWidth(
        "recovery-progress",
        data.recovery
    );


    setText(
        "monitor-recovery-status",

        data.recovery < 50
            ? "Low"
            : "Good"

    );


    setText(
        "monitor-training",
        `${data.trainingLoad}%`
    );


    setWidth(
        "training-progress",
        data.trainingLoad
    );


    setText(
        "monitor-training-status",

        data.trainingLoad > 80
            ? "High"
            : "Normal"

    );


    setText(
        "monitor-risk",
        `${risk}%`
    );


    setWidth(
        "risk-progress",
        risk
    );


    setText(
        "monitor-risk-status",
        condition
    );

}


/* ==========================================
   COACH DASHBOARD
========================================== */

function updateCoachDashboard(
    data,
    risk
) {

    setText(
        "team-hr",
        `${data.heartRate} BPM`
    );


    setText(
        "team-fatigue",
        `${data.fatigue}%`
    );


    setText(
        "team-recovery",
        `${data.recovery}%`
    );


    if (risk > 60) {

        setText(
            "coach-summary-title",
            "Attention required"
        );


        setText(
            "coach-summary-text",
            "Current indicators show elevated training stress. Consider reducing load and prioritizing recovery."
        );

    }

    else if (risk > 30) {

        setText(
            "coach-summary-title",
            "Monitor athlete"
        );


        setText(
            "coach-summary-text",
            "Some indicators are elevated. Continue monitoring the athlete during the session."
        );

    }

    else {

        setText(
            "coach-summary-title",
            "Stable condition"
        );


        setText(
            "coach-summary-text",
            "Current indicators are relatively stable and support the planned session."
        );

    }

}


/* ==========================================
   HEART RATE CHART
========================================== */

function drawHeartRateChart() {

    const line =
        document.getElementById(
            "heart-rate-line"
        );


    if (
        !line ||
        heartRateHistory.length === 0
    ) {
        return;
    }


    const width = 600;

    const height = 180;


    const min =
        Math.min(
            ...heartRateHistory
        ) - 5;


    const max =
        Math.max(
            ...heartRateHistory
        ) + 5;


    const range =
        Math.max(
            1,
            max - min
        );


    const points =
        heartRateHistory
            .map(
                (value, index) => {

                    const x =
                        heartRateHistory.length === 1

                            ? width / 2

                            : (
                                index /
                                (
                                    heartRateHistory.length - 1
                                )
                            ) * width;


                    const y =
                        height -
                        (
                            (
                                value - min
                            ) /
                            range
                        ) * height;


                    return `${x},${y}`;

                }
            )
            .join(" ");


    line.setAttribute(
        "points",
        points
    );

}


/* ==========================================
   HISTORY PANEL
========================================== */

function updateHistoryPanel(data) {

    setWidth(
        "history-heart",
        clamp(
            data.heartRate - 50,
            0,
            100
        )
    );


    setText(
        "history-heart-value",
        `${data.heartRate} BPM`
    );


    setWidth(
        "history-fatigue",
        data.fatigue
    );


    setText(
        "history-fatigue-value",
        `${data.fatigue}%`
    );


    setWidth(
        "history-recovery",
        data.recovery
    );


    setText(
        "history-recovery-value",
        `${data.recovery}%`
    );


    setWidth(
        "history-training",
        data.trainingLoad
    );


    setText(
        "history-training-value",
        `${data.trainingLoad}%`
    );

}


/* ==========================================
   HISTORY TABLE
========================================== */

function updateHistoryTable() {

    const list =
        document.getElementById(
            "history-list"
        );


    if (!list) {
        return;
    }


    if (
        measurementHistory.length === 0
    ) {

        list.innerHTML = `
            <div class="empty-history">
                Collecting measurements...
            </div>
        `;

        return;

    }


    list.innerHTML =

        measurementHistory
            .slice()
            .reverse()
            .map(
                item => `

                    <div class="history-list-item">

                        <span>
                            ${item.time}
                        </span>

                        <span>
                            ${item.heartRate}
                        </span>

                        <span>
                            ${item.fatigue}%
                        </span>

                        <span>
                            ${item.recovery}%
                        </span>

                        <span>
                            ${item.risk}%
                        </span>

                    </div>

                `
            )
            .join("");

}


/* ==========================================
   MAIN DASHBOARD
========================================== */

function updateDashboard() {

    const data =
        generateSensorData();


    const risk =
        calculateRisk(data);


    const condition =
        getCondition(risk);


    /* HISTORY */

    heartRateHistory.push(
        data.heartRate
    );


    fatigueHistory.push(
        data.fatigue
    );


    recoveryHistory.push(
        data.recovery
    );


    trainingLoadHistory.push(
        data.trainingLoad
    );


    riskHistory.push(
        risk
    );


    if (
        heartRateHistory.length > 20
    ) {
        heartRateHistory.shift();
    }


    if (
        fatigueHistory.length > 20
    ) {
        fatigueHistory.shift();
    }


    if (
        recoveryHistory.length > 20
    ) {
        recoveryHistory.shift();
    }


    if (
        trainingLoadHistory.length > 20
    ) {
        trainingLoadHistory.shift();
    }


    if (
        riskHistory.length > 20
    ) {
        riskHistory.shift();
    }


    /* MEASUREMENT */

    measurementHistory.push({

        time:
            new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            ),

        heartRate:
            data.heartRate,

        fatigue:
            data.fatigue,

        recovery:
            data.recovery,

        risk:
            risk

    });


    if (
        measurementHistory.length > 20
    ) {
        measurementHistory.shift();
    }


    /* MAIN VALUES */

    setText(
        "heart-rate",
        data.heartRate
    );


    setText(
        "fatigue",
        `${data.fatigue}%`
    );


    setText(
        "recovery",
        `${data.recovery}%`
    );


    setText(
        "training-load",
        `${data.trainingLoad}%`
    );


    setText(
        "injury-risk",
        `${risk}%`
    );


    setText(
        "heart-status",

        data.heartRate > 100
            ? "● Elevated"
            : "● Normal"

    );


    setText(
        "fatigue-status",

        data.fatigue > 70
            ? "● High"
            : "● Moderate"

    );


    setText(
        "recovery-status",

        data.recovery < 50
            ? "● Low"
            : "● Good"

    );


    setText(
        "training-status",

        data.trainingLoad > 80
            ? "● High"
            : "● Normal"

    );


    setText(
        "condition-status",
        condition
    );


    setText(
        "condition-description",

        condition === "High"

            ? "Current indicators suggest increased training stress."

            : condition === "Moderate"

                ? "Some indicators need closer monitoring."

                : "Current indicators are relatively stable."

    );


    setText(
        "current-date",
        new Date().toLocaleDateString(
            [],
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        )
    );


    /* UPDATE SECTIONS */

    updateAICoach(
        data,
        risk
    );


    updateMonitoring(
        data,
        risk
    );


    updateCoachDashboard(
        data,
        risk
    );


    updateHistoryPanel(
        data
    );


    updateHistoryTable();


    drawHeartRateChart();

}


/* ==========================================
   AI COACH BUTTON
========================================== */

const coachButton =
    document.getElementById(
        "coach-button"
    );


if (coachButton) {

    coachButton.addEventListener(
        "click",
        () => {

            coachButton.textContent =
                "AI is analyzing...";


            setTimeout(
                () => {

                    updateDashboard();


                    coachButton.textContent =
                        "Analysis complete ✓";


                    setTimeout(
                        () => {

                            coachButton.textContent =
                                "Run AI Analysis";

                        },
                        1400
                    );

                },
                900
            );

        }
    );

}


/* ==========================================
   MENTAL HEALTH / WELLBEING
========================================== */

(function () {


    /* --------------------------------------
       SLIDER SETUP
    -------------------------------------- */

    function setupSlider(
        sliderId,
        valueId
    ) {

        const slider =
            document.getElementById(
                sliderId
            );


        const value =
            document.getElementById(
                valueId
            );


        if (
            !slider ||
            !value
        ) {
            return;
        }


        value.textContent =
            `${slider.value}/5`;


        slider.addEventListener(
            "input",
            () => {

                value.textContent =
                    `${slider.value}/5`;

            }
        );

    }


    setupSlider(
        "sleep-slider",
        "sleep-value"
    );


    setupSlider(
        "stress-slider",
        "stress-value"
    );


    setupSlider(
        "mood-slider",
        "mood-value"
    );


    setupSlider(
        "motivation-slider",
        "motivation-value"
    );



    /* --------------------------------------
       ANALYZE WELLBEING
    -------------------------------------- */

    function analyzeMentalHealth() {


        const sleep =
            Number(
                document.getElementById(
                    "sleep-slider"
                ).value
            );


        const stress =
            Number(
                document.getElementById(
                    "stress-slider"
                ).value
            );


        const mood =
            Number(
                document.getElementById(
                    "mood-slider"
                ).value
            );


        const motivation =
            Number(
                document.getElementById(
                    "motivation-slider"
                ).value
            );


        /*
            Sleep:
            1 = poor
            5 = excellent

            Stress:
            1 = low
            5 = high

            Mood:
            1 = low
            5 = positive

            Motivation:
            1 = low
            5 = high
        */


        const readiness =
            Math.round(

                (
                    sleep +
                    (6 - stress) +
                    mood +
                    motivation
                )
                / 20
                * 100

            );


        updateMentalResult(
            readiness,
            sleep,
            stress,
            mood,
            motivation
        );

    }



    /* --------------------------------------
       MENTAL RESULT
    -------------------------------------- */

    function updateMentalResult(
        readiness,
        sleep,
        stress,
        mood,
        motivation
    ) {


        /* SCORE */

        setText(
            "mental-readiness",
            `${readiness}%`
        );


        setText(
            "mental-ring-value",
            readiness
        );


        /* FACTORS */

        setText(
            "mental-factor-sleep",

            sleep <= 2
                ? "Poor"
                : sleep === 3
                    ? "Moderate"
                    : "Good"

        );


        setText(
            "mental-factor-stress",

            stress >= 4
                ? "High"
                : stress === 3
                    ? "Moderate"
                    : "Low"

        );


        setText(
            "mental-factor-mood",

            mood <= 2
                ? "Low"
                : mood === 3
                    ? "Stable"
                    : "Positive"

        );


        setText(
            "mental-factor-motivation",

            motivation <= 2
                ? "Low"
                : motivation === 3
                    ? "Moderate"
                    : "High"

        );


        const badge =
            document.getElementById(
                "mental-status-badge"
            );


        const ring =
            document.getElementById(
                "mental-ring"
            );


        /* ----------------------------------
           HIGH READINESS
        ---------------------------------- */

        if (
            readiness >= 75
        ) {

            badge.textContent =
                "READY";


            badge.className =
                "mental-badge positive";


            setText(
                "mental-result-title",
                "Positive readiness"
            );


            setText(
                "mental-result-text",
                "Your self-reported wellbeing indicators are currently supportive of training."
            );


            setText(
                "mental-recommendation-text",
                "Continue with the planned session while maintaining normal recovery habits."
            );


            ring.style.borderColor =
                "#35d07f";

        }


        /* ----------------------------------
           MODERATE READINESS
        ---------------------------------- */

        else if (
            readiness >= 50
        ) {

            badge.textContent =
                "MONITOR";


            badge.className =
                "mental-badge warning";


            setText(
                "mental-result-title",
                "Monitor wellbeing"
            );


            setText(
                "mental-result-text",
                "Some wellbeing indicators suggest that your readiness may be lower than usual."
            );


            setText(
                "mental-recommendation-text",
                "Consider a controlled session, monitor how you feel, and allow additional recovery if needed."
            );


            ring.style.borderColor =
                "#f0c85c";

        }


        /* ----------------------------------
           LOW READINESS
        ---------------------------------- */

        else {

            badge.textContent =
                "RECOVERY";


            badge.className =
                "mental-badge danger";


            setText(
                "mental-result-title",
                "Recovery may be helpful"
            );


            setText(
                "mental-result-text",
                "Your self-reported indicators suggest reduced readiness today."
            );


            setText(
                "mental-recommendation-text",
                "Consider reducing training intensity and prioritizing recovery. If you are struggling emotionally, talk to a trusted person or qualified professional."
            );


            ring.style.borderColor =
                "#ff6b6b";

        }

    }



    /* --------------------------------------
       MENTAL HEALTH BUTTON
    -------------------------------------- */

    const mentalButton =
        document.getElementById(
            "mental-analyze-button"
        );


    if (mentalButton) {

        mentalButton.addEventListener(
            "click",
            () => {


                mentalButton.textContent =
                    "AI is analyzing...";


                setTimeout(
                    () => {


                        analyzeMentalHealth();


                        mentalButton.textContent =
                            "Analysis Complete ✓";


                        setTimeout(
                            () => {

                                mentalButton.textContent =
                                    "Analyze Wellbeing →";

                            },
                            1500
                        );


                    },
                    700
                );

            }
        );

    }



    /* --------------------------------------
       INITIAL RESULT
    -------------------------------------- */

    if (
        document.getElementById(
            "mental-health"
        )
    ) {

        analyzeMentalHealth();

    }

})();


/* ==========================================
   START DASHBOARD
========================================== */

updateDashboard();


setInterval(
    updateDashboard,
    3000
);