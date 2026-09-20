// ==========================================
// ATHLETIX — FINAL MVP ENGINE
// ==========================================


// ==========================================
// HISTORY
// ==========================================

const heartRateHistory = [];
const fatigueHistory = [];
const recoveryHistory = [];
const trainingLoadHistory = [];
const riskHistory = [];

const measurementHistory = [];


// ==========================================
// DEMO SENSOR DATA
// ==========================================

function generateSensorData() {

    return {

        heartRate:
            Math.floor(75 + Math.random() * 45),

        fatigue:
            Math.floor(45 + Math.random() * 45),

        recovery:
            Math.floor(40 + Math.random() * 45),

        trainingLoad:
            Math.floor(55 + Math.random() * 40)

    };
}


// ==========================================
// RISK ENGINE
// ==========================================

function calculateRisk(
    heartRate,
    fatigue,
    recovery,
    trainingLoad
) {

    let risk = 0;


    if (heartRate > 100) {
        risk += 25;
    }

    if (fatigue > 70) {
        risk += 30;
    }

    if (recovery < 50) {
        risk += 25;
    }

    if (trainingLoad > 80) {
        risk += 20;
    }


    return Math.min(risk, 100);
}


// ==========================================
// CONDITION
// ==========================================

function getCondition(risk) {

    if (risk <= 30) {

        return {

            title: "Low Load",

            description:
                "Your current indicators look stable. Planned training can continue."

        };

    }


    if (risk <= 60) {

        return {

            title: "Moderate Load",

            description:
                "Some indicators suggest accumulated fatigue. Training intensity should be monitored."

        };

    }


    return {

        title: "High Load",

        description:
            "Multiple indicators are elevated. Recovery should be prioritized."

    };
}


// ==========================================
// AI DECISION ENGINE
// ==========================================

function getAIDecision(
    heartRate,
    fatigue,
    recovery,
    trainingLoad,
    risk
) {


    // HIGH RISK

    if (risk > 60) {

        return {

            title: "Recovery Priority",

            text:
                "Multiple indicators are elevated. High-intensity training should be avoided today.",

            intensity:
                "Recovery",

            recommendation:
                "Prioritize recovery, mobility and low-intensity activity. Avoid adding significant training load.",

            schedule:
                "Today's strength session has been reduced to a recovery-focused session.",

            reasons: {

                fatigue:
                    fatigue > 70 ? "High" : "Normal",

                recovery:
                    recovery < 50 ? "Low" : "Moderate",

                training:
                    trainingLoad > 80 ? "High" : "Moderate",

                heart:
                    heartRate > 100 ? "Elevated" : "Normal"

            }

        };

    }


    // MODERATE RISK

    if (risk > 30) {

        return {

            title: "Moderate Training",

            text:
                "Your indicators show moderate accumulated load. Training can continue with reduced intensity.",

            intensity:
                "Moderate",

            recommendation:
                "Keep today's session moderate and include additional recovery time between intense efforts.",

            schedule:
                "Strength training remains scheduled, but intensity has been reduced to moderate.",

            reasons: {

                fatigue:
                    fatigue > 70 ? "Elevated" : "Normal",

                recovery:
                    recovery < 50 ? "Low" : "Moderate",

                training:
                    trainingLoad > 80 ? "High" : "Moderate",

                heart:
                    heartRate > 100 ? "Elevated" : "Normal"

            }

        };

    }


    // STABLE

    return {

        title: "Normal Training",

        text:
            "Current indicators are relatively stable and support the planned training session.",

        intensity:
            "Normal",

        recommendation:
            "Continue with the planned workout while monitoring your condition during the session.",

        schedule:
            "Planned strength training remains unchanged.",

        reasons: {

            fatigue:
                fatigue > 70 ? "Elevated" : "Normal",

            recovery:
                recovery < 50 ? "Low" : "Good",

            training:
                trainingLoad > 80 ? "High" : "Moderate",

            heart:
                heartRate > 100 ? "Elevated" : "Normal"

        }

    };
}


// ==========================================
// UPDATE AI COACH
// ==========================================

function updateAICoach(
    heartRate,
    fatigue,
    recovery,
    trainingLoad,
    risk
) {

    const decision =
        getAIDecision(
            heartRate,
            fatigue,
            recovery,
            trainingLoad,
            risk
        );


    document.getElementById(
        "ai-decision-title"
    ).textContent =
        decision.title;


    document.getElementById(
        "ai-decision-text"
    ).textContent =
        decision.text;


    document.getElementById(
        "ai-intensity"
    ).textContent =
        decision.intensity;


    document.getElementById(
        "ai-recommendation"
    ).textContent =
        decision.recommendation;


    document.getElementById(
        "reason-fatigue"
    ).textContent =
        decision.reasons.fatigue;


    document.getElementById(
        "reason-recovery"
    ).textContent =
        decision.reasons.recovery;


    document.getElementById(
        "reason-training"
    ).textContent =
        decision.reasons.training;


    document.getElementById(
        "reason-heart"
    ).textContent =
        decision.reasons.heart;


    // COLORS

    const intensity =
        document.getElementById(
            "ai-intensity"
        );


    intensity.className = "";


    if (risk <= 30) {

        intensity.classList.add(
            "positive"
        );

    }

    else if (risk <= 60) {

        intensity.classList.add(
            "warning"
        );

    }

    else {

        intensity.classList.add(
            "danger"
        );

    }


    // SCHEDULE

    document.getElementById(
        "recommended-intensity"
    ).textContent =
        decision.intensity;


    document.getElementById(
        "schedule-note"
    ).textContent =
        decision.schedule;


    const trainingName =
        document.getElementById(
            "main-training-name"
        );


    const trainingDescription =
        document.getElementById(
            "main-training-description"
        );


    const recoveryStatus =
        document.getElementById(
            "recovery-session-status"
        );


    if (risk > 60) {

        trainingName.textContent =
            "Recovery Session";

        trainingDescription.textContent =
            "30 min · Mobility, stretching & low-intensity movement";

        recoveryStatus.textContent =
            "Priority";

    }

    else if (risk > 30) {

        trainingName.textContent =
            "Modified Strength Training";

        trainingDescription.textContent =
            "45 min · Reduced intensity session";

        recoveryStatus.textContent =
            "Recommended";

    }

    else {

        trainingName.textContent =
            "Strength Training";

        trainingDescription.textContent =
            "60 min · Planned session";

        recoveryStatus.textContent =
            "Recommended";

    }
}


// ==========================================
// MONITORING
// ==========================================

function updateMonitoring(
    heartRate,
    fatigue,
    recovery,
    trainingLoad,
    risk
) {


    document.getElementById(
        "monitor-heart-rate"
    ).textContent =
        heartRate;


    const heartStatus =
        document.getElementById(
            "monitor-heart-status"
        );


    if (heartRate > 100) {

        heartStatus.textContent =
            "● Elevated heart rate";

        heartStatus.className =
            "danger";

    }

    else {

        heartStatus.textContent =
            "● Normal heart rate";

        heartStatus.className =
            "positive";

    }


    document.getElementById(
        "monitor-chart-value"
    ).textContent =
        heartRate + " BPM";


    // FATIGUE

    document.getElementById(
        "monitor-fatigue"
    ).textContent =
        fatigue + "%";


    document.getElementById(
        "fatigue-progress"
    ).style.width =
        fatigue + "%";


    document.getElementById(
        "monitor-fatigue-status"
    ).textContent =
        fatigue > 70
            ? "Elevated"
            : "Normal";


    // RECOVERY

    document.getElementById(
        "monitor-recovery"
    ).textContent =
        recovery + "%";


    document.getElementById(
        "recovery-progress"
    ).style.width =
        recovery + "%";


    document.getElementById(
        "monitor-recovery-status"
    ).textContent =
        recovery < 50
            ? "Low"
            : "Moderate";


    // TRAINING

    document.getElementById(
        "monitor-training"
    ).textContent =
        trainingLoad + "%";


    document.getElementById(
        "training-progress"
    ).style.width =
        trainingLoad + "%";


    document.getElementById(
        "monitor-training-status"
    ).textContent =
        trainingLoad > 80
            ? "High"
            : "Moderate";


    // RISK

    document.getElementById(
        "monitor-risk"
    ).textContent =
        risk + "%";


    document.getElementById(
        "risk-progress"
    ).style.width =
        risk + "%";


    const riskStatus =
        document.getElementById(
            "monitor-risk-status"
        );


    if (risk <= 30) {

        riskStatus.textContent =
            "Low risk";

    }

    else if (risk <= 60) {

        riskStatus.textContent =
            "Moderate risk";

    }

    else {

        riskStatus.textContent =
            "High risk";

    }
}


// ==========================================
// MAIN DASHBOARD
// ==========================================

function updateDashboard() {

    const data =
        generateSensorData();


    const heartRate =
        data.heartRate;

    const fatigue =
        data.fatigue;

    const recovery =
        data.recovery;

    const trainingLoad =
        data.trainingLoad;


    const risk =
        calculateRisk(
            heartRate,
            fatigue,
            recovery,
            trainingLoad
        );


    const condition =
        getCondition(risk);


    // HISTORY

    heartRateHistory.push(
        heartRate
    );

    fatigueHistory.push(
        fatigue
    );

    recoveryHistory.push(
        recovery
    );

    trainingLoadHistory.push(
        trainingLoad
    );

    riskHistory.push(
        risk
    );


    if (
        heartRateHistory.length > 20
    ) {

        heartRateHistory.shift();
        fatigueHistory.shift();
        recoveryHistory.shift();
        trainingLoadHistory.shift();
        riskHistory.shift();

    }


    // TABLE

    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    measurementHistory.unshift({

        time:
            time,

        heartRate:
            heartRate,

        fatigue:
            fatigue,

        recovery:
            recovery,

        risk:
            risk

    });


    if (
        measurementHistory.length > 8
    ) {

        measurementHistory.pop();

    }


    // MAIN VALUES

    document.getElementById(
        "heart-rate"
    ).textContent =
        heartRate;


    document.getElementById(
        "fatigue"
    ).textContent =
        fatigue;


    document.getElementById(
        "recovery"
    ).textContent =
        recovery;


    document.getElementById(
        "training-load"
    ).textContent =
        trainingLoad;


    document.getElementById(
        "injury-risk"
    ).textContent =
        risk + "%";


    // CONDITION

    document.getElementById(
        "condition-status"
    ).textContent =
        condition.title;


    document.getElementById(
        "condition-description"
    ).textContent =
        condition.description;


    // STATUS

    const heartStatus =
        document.getElementById(
            "heart-status"
        );


    if (heartRate > 100) {

        heartStatus.textContent =
            "● Elevated";

        heartStatus.className =
            "danger";

    }

    else {

        heartStatus.textContent =
            "● Normal";

        heartStatus.className =
            "positive";

    }


    const fatigueStatus =
        document.getElementById(
            "fatigue-status"
        );


    if (fatigue > 70) {

        fatigueStatus.textContent =
            "● Elevated";

        fatigueStatus.className =
            "warning";

    }

    else {

        fatigueStatus.textContent =
            "● Normal";

        fatigueStatus.className =
            "positive";

    }


    const recoveryStatus =
        document.getElementById(
            "recovery-status"
        );


    if (recovery < 50) {

        recoveryStatus.textContent =
            "● Low";

        recoveryStatus.className =
            "danger";

    }

    else {

        recoveryStatus.textContent =
            "● Moderate";

        recoveryStatus.className =
            "warning";

    }


    const trainingStatus =
        document.getElementById(
            "training-status"
        );


    if (trainingLoad > 80) {

        trainingStatus.textContent =
            "● High";

        trainingStatus.className =
            "danger";

    }

    else {

        trainingStatus.textContent =
            "● Moderate";

        trainingStatus.className =
            "warning";

    }


    // AI

    updateAICoach(
        heartRate,
        fatigue,
        recovery,
        trainingLoad,
        risk
    );


    // MONITORING

    updateMonitoring(
        heartRate,
        fatigue,
        recovery,
        trainingLoad,
        risk
    );


    // COACH DASHBOARD

    updateCoachDashboard(
        heartRate,
        fatigue,
        recovery,
        risk
    );


    // DATE

    document.getElementById(
        "current-date"
    ).textContent =
        new Date().toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric"
            }
        );


    // CHARTS

    drawHeartRateChart();

    updateHistoryPanel();

    updateHistoryTable();
}


// ==========================================
// COACH DASHBOARD
// ==========================================

function updateCoachDashboard(
    heartRate,
    fatigue,
    recovery,
    risk
) {


    document.getElementById(
        "team-hr"
    ).textContent =
        heartRate;


    document.getElementById(
        "team-fatigue"
    ).textContent =
        fatigue + "%";


    document.getElementById(
        "team-recovery"
    ).textContent =
        recovery + "%";


    const teamRisk =
        document.getElementById(
            "team-risk"
        );


    const summaryTitle =
        document.getElementById(
            "coach-summary-title"
        );


    const summaryText =
        document.getElementById(
            "coach-summary-text"
        );


    if (risk <= 30) {

        teamRisk.textContent =
            "Low";

        teamRisk.className =
            "team-risk positive";


        summaryTitle.textContent =
            "Athlete condition stable";


        summaryText.textContent =
            "Current indicators support the planned training session.";

    }

    else if (risk <= 60) {

        teamRisk.textContent =
            "Moderate";

        teamRisk.className =
            "team-risk warning";


        summaryTitle.textContent =
            "Moderate accumulated load";


        summaryText.textContent =
            "The system recommends controlled training intensity and additional recovery.";

    }

    else {

        teamRisk.textContent =
            "High";

        teamRisk.className =
            "team-risk danger";


        summaryTitle.textContent =
            "Recovery priority";


        summaryText.textContent =
            "Multiple indicators are elevated. High-intensity training should be avoided.";

    }
}


// ==========================================
// HEART RATE CHART
// ==========================================

function drawHeartRateChart() {

    const line =
        document.getElementById(
            "heart-rate-line"
        );


    if (!line) {
        return;
    }


    const points = [];


    const minHR = 70;
    const maxHR = 125;


    heartRateHistory.forEach(
        function(value, index) {


            const divisor =
                Math.max(
                    heartRateHistory.length - 1,
                    1
                );


            const x =
                (index / divisor) * 1000;


            const normalized =
                (value - minHR) /
                (maxHR - minHR);


            const y =
                280 -
                normalized * 240;


            points.push(
                `${x},${y}`
            );

        }
    );


    line.setAttribute(
        "points",
        points.join(" ")
    );
}


// ==========================================
// HISTORY PANEL
// ==========================================

function updateHistoryPanel() {

    if (
        heartRateHistory.length === 0
    ) {

        return;
    }


    const heart =
        heartRateHistory[
            heartRateHistory.length - 1
        ];


    const fatigue =
        fatigueHistory[
            fatigueHistory.length - 1
        ];


    const recovery =
        recoveryHistory[
            recoveryHistory.length - 1
        ];


    const training =
        trainingLoadHistory[
            trainingLoadHistory.length - 1
        ];


    document.getElementById(
        "history-heart"
    ).style.width =
        Math.min(
            ((heart - 70) / 55) * 100,
            100
        ) + "%";


    document.getElementById(
        "history-fatigue"
    ).style.width =
        fatigue + "%";


    document.getElementById(
        "history-recovery"
    ).style.width =
        recovery + "%";


    document.getElementById(
        "history-training"
    ).style.width =
        training + "%";


    document.getElementById(
        "history-heart-value"
    ).textContent =
        heart + " BPM";


    document.getElementById(
        "history-fatigue-value"
    ).textContent =
        fatigue + "%";


    document.getElementById(
        "history-recovery-value"
    ).textContent =
        recovery + "%";


    document.getElementById(
        "history-training-value"
    ).textContent =
        training + "%";
}


// ==========================================
// HISTORY TABLE
// ==========================================

function updateHistoryTable() {

    const container =
        document.getElementById(
            "history-list"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    measurementHistory.forEach(
        function(measurement) {


            let riskClass =
                "risk-low";


            if (
                measurement.risk > 30 &&
                measurement.risk <= 60
            ) {

                riskClass =
                    "risk-medium";

            }


            if (
                measurement.risk > 60
            ) {

                riskClass =
                    "risk-high";

            }


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "history-table-row";


            row.innerHTML = `

                <span>
                    ${measurement.time}
                </span>

                <span>
                    ${measurement.heartRate} BPM
                </span>

                <span>
                    ${measurement.fatigue}%
                </span>

                <span>
                    ${measurement.recovery}%
                </span>

                <span class="${riskClass}">
                    ${measurement.risk}%
                </span>

            `;


            container.appendChild(row);

        }
    );
}


// ==========================================
// AI BUTTON
// ==========================================

const coachButton =
    document.getElementById(
        "coach-button"
    );


if (coachButton) {

    coachButton.addEventListener(
        "click",
        function() {


            const button =
                this;


            button.textContent =
                "AI is analyzing...";


            setTimeout(
                function() {


                    const heartRate =
                        Number(
                            document.getElementById(
                                "heart-rate"
                            ).textContent
                        );


                    const fatigue =
                        Number(
                            document.getElementById(
                                "fatigue"
                            ).textContent
                        );


                    const recovery =
                        Number(
                            document.getElementById(
                                "recovery"
                            ).textContent
                        );


                    const trainingLoad =
                        Number(
                            document.getElementById(
                                "training-load"
                            ).textContent
                        );


                    const risk =
                        calculateRisk(
                            heartRate,
                            fatigue,
                            recovery,
                            trainingLoad
                        );


                    updateAICoach(
                        heartRate,
                        fatigue,
                        recovery,
                        trainingLoad,
                        risk
                    );


                    button.textContent =
                        "Analysis Complete ✓";


                    setTimeout(
                        function() {

                            button.textContent =
                                "Analyze My Condition →";

                        },
                        1500
                    );


                },
                900
            );

        }
    );
}


// ==========================================
// START ATHLETIX
// ==========================================

updateDashboard();


setInterval(
    updateDashboard,
    3000
);