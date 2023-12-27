import React, { useLayoutEffect } from 'react';

const ContributionGraph = ({ contributionEvents }) => {
    const contributions = getContributionsFromEvents(contributionEvents);
    contributions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const cellSize = 45;
    const xOffset = 40;
    const yOffset = 30;
    const graphWidth = 1300;
    // contributions.length * (cellSize + 10) + xOffset * 2
    const graphHeight = 600;

    useLayoutEffect(() => {
        const svg = document.querySelector('svg');
        svg.style.display = 'none';
        setTimeout(() => {
            svg.style.display = 'block';
        }, 0);
    }, []);

    return (
        <div style={styles.graphContainer}>
            <svg width={graphWidth} height={graphHeight}>
                {/* Time axis */}
                <text x={xOffset} y={graphHeight + 40} textAnchor="middle">
                    Time
                </text>
                <line
                    x1={xOffset}
                    y1={graphHeight}
                    x2={xOffset + graphWidth}
                    y2={graphHeight}
                    stroke="#ccc"
                    strokeWidth="2"
                />

                {/* Grid lines */}
                {Array.from({ length: 4 }, (_, i) => (
                    <line
                        key={i}
                        x1={xOffset}
                        y1={graphHeight - (i + 1) * cellSize - yOffset}
                        x2={xOffset + graphWidth}
                        y2={graphHeight - (i + 1) * cellSize - yOffset}
                        stroke="#eee"
                        strokeOpacity="0.5"
                        strokeWidth="1"
                    />
                ))}

                {/* Month labels */}
                {contributions.map((contribution, index) => (
                    <text
                        key={index}
                        x={index * (cellSize + 10) + xOffset + cellSize / 2}
                        y={graphHeight + 45}
                        textAnchor="middle"
                    >
                        {contribution.date.slice(4, 7)}
                    </text>
                ))}

                {/* Contribution bars */}
                {contributions.map((contribution, index) => (
                    <rect
                        key={index}
                        width={cellSize}
                        height={contribution.count * cellSize}
                        x={index * (cellSize + 10) + xOffset}
                        y={graphHeight - yOffset - (4 - contribution.count) * cellSize}
                        fill={getColorBasedOnContributionCount(contribution.count)}
                    />
                ))}
            </svg>
        </div>
    );
};

const getContributionsFromEvents = (contributionEvents) => {
    if (!contributionEvents || !Array.isArray(contributionEvents)) {
        return [];
    }

    return contributionEvents.map((event) => ({
        count: event.type === "CreateEvent" ? 1 : 0, // Adjust logic for other event types
        date: formatDateForGraph(event.created_at),
    }));
};

const formatDateForGraph = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}-${date.getDate()}`; // Month and day format
};

const getColorBasedOnContributionCount = (contributionCount) => {
    const colors = [
        "#ebedf0",
        "#c6e48b",
        "#7bc96f",
        "#239a3b",
        "#006b4f",
    ];
    return colors[Math.min(contributionCount, colors.length - 1)];
};

const styles = {
    graphContainer: {
        marginTop: "20px",
        overflow: "visible",
    },
};

export default ContributionGraph;
