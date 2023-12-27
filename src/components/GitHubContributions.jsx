import React, { useState, useEffect } from 'react';
import ContributionGraph from './ContributionGraph';


export const GitHubContributions = ({ githubLink }) => {
    const [contributionGraph, setContributionGraph] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (githubLink) {
            const username = getGitHubUsername(githubLink);

            // Fetch GitHub REST API data for contribution graph
            fetchGitHubData(username)
                .then(data => {
                    setContributionGraph(data);
                    // Fetch GitHub REST API data for user information
                    return fetchGitHubUserData(username);
                })
                .then(userData => {
                    setUserData(userData);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching GitHub data:", error);
                    setLoading(false);
                });
        }
    }, [githubLink]);

    const src = `https://ghchart.rshah.org/${getGitHubUsername(githubLink)}`;
    console.log(src);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>GitHub Contribution Graph</h1>
            {loading && <p style={styles.loading}>Loading...</p>}
            {contributionGraph &&
                <img src={src} alt="Name Your Github chart" />
                // <ContributionGraph contributionGraph={contributionGraph} />
            }
            {userData && <UserData userData={userData} />}
        </div>
    );
};

// const ContributionGraph = ({ contributionGraph }) => {
//     return (
//         <div style={styles.section}>
//             <h2 style={styles.subHeading}>Contribution Graph</h2>
//             {/* Display your contribution graph here */}
//             <p style={styles.placeholder}>Contribution graph will be displayed here</p>
//             {/* You can implement the rendering of the contribution graph using SVG or other techniques */}
//             {/* For simplicity, I'm just displaying the raw JSON data here */}
//             <pre>{JSON.stringify(contributionGraph, null, 2)}</pre>
//         </div>
//     );
// };

const UserData = ({ userData }) => {
    return (
        <div style={styles.section}>
            <h2 style={styles.subHeading}>User Information</h2>
            <img src={userData.avatar_url} alt="GitHub Profile" style={styles.avatar} />
            <p>Username: {userData.login}</p>
            <p>Name: {userData.name}</p>
        </div>
    );
};

async function fetchGitHubData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public`, {
            headers: {
                "Accept": "application/json",
            },
        });

        const eventData = await response.json();

        if (response.ok) {
            return eventData;
        } else {
            throw new Error(eventData.message || "Error fetching GitHub data");
        }
    } catch (error) {
        throw new Error("Error fetching GitHub data: " + error.message);
    }
}

async function fetchGitHubUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                "Accept": "application/json",
            },
        });

        const userData = await response.json();

        if (response.ok) {
            return userData;
        } else {
            throw new Error(userData.message || "Error fetching GitHub user data");
        }
    } catch (error) {
        throw new Error("Error fetching GitHub user data: " + error.message);
    }
}

function getGitHubUsername(githubLink) {
    const usernameRegex = /github\.com\/([^\/]+)/;
    const match = githubLink.match(usernameRegex);
    return match ? match[1] : null;
}


const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    loading: {
        fontSize: '18px',
        fontStyle: 'italic',
    },
    section: {
        marginTop: '20px',
    },
    subHeading: {
        fontSize: '20px',
        marginBottom: '10px',
    },
    placeholder: {
        fontSize: '16px',
        fontStyle: 'italic',
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
};

