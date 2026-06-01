import { useState } from "react";

export interface Challenge {
  readonly id: string;
  readonly title: string;
  readonly difficulty: "beginner" | "intermediate" | "exploratory";
  readonly goal: string;
  readonly hint: string;
  readonly successCondition: string;
  readonly explanationAfterSuccess: string;
}

interface ChallengePanelProps {
  readonly challenges: readonly Challenge[];
}

export function ChallengePanel({
  challenges
}: ChallengePanelProps): JSX.Element {
  const [completedIds, setCompletedIds] = useState<ReadonlySet<string>>(
    () => new Set()
  );

  function toggleChallenge(challengeId: string): void {
    setCompletedIds((current) => {
      const next = new Set(current);

      if (next.has(challengeId)) {
        next.delete(challengeId);
      } else {
        next.add(challengeId);
      }

      return next;
    });
  }

  return (
    <section className="panel challenge-panel" aria-labelledby="challenge-title">
      <div className="panel-heading compact">
        <div>
          <span className="panel-kicker">Challenge mode</span>
          <h2 id="challenge-title">Explore by doing</h2>
        </div>
      </div>

      <div className="challenge-list">
        {challenges.map((challenge) => {
          const isCompleted = completedIds.has(challenge.id);

          return (
            <article className="challenge-item" key={challenge.id}>
              <div className="challenge-title-row">
                <span className="difficulty">{challenge.difficulty}</span>
                <label>
                  <input
                    checked={isCompleted}
                    type="checkbox"
                    onChange={() => toggleChallenge(challenge.id)}
                  />
                  <span>{challenge.title}</span>
                </label>
              </div>
              <p>{challenge.goal}</p>
              <details>
                <summary>Hint and success check</summary>
                <p>{challenge.hint}</p>
                <p>
                  <strong>Success:</strong> {challenge.successCondition}
                </p>
                {isCompleted ? <p>{challenge.explanationAfterSuccess}</p> : null}
              </details>
            </article>
          );
        })}
      </div>
    </section>
  );
}
