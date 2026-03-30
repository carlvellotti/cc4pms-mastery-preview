#!/usr/bin/env python3
"""Calculate the cost of meetings based on attendees and estimated salaries."""

import json
import sys

# Estimated annual salaries by role (USD)
SALARY_ESTIMATES = {
    "VP Product": 220000,
    "Senior PM": 165000,
    "Eng Lead": 190000,
    "Designer": 140000,
    "Data Analyst": 120000,
    "Backend Engineer": 170000,
    "Frontend Engineer": 160000,
    "QA Lead": 145000,
    "Customer Success": 110000,
    "Sales Lead": 155000,
}

# Working hours per year (50 weeks * 40 hours)
WORKING_HOURS_PER_YEAR = 2000


def hourly_rate(annual_salary):
    return annual_salary / WORKING_HOURS_PER_YEAR


def calculate_meeting_cost(meeting):
    """Calculate cost for a single meeting."""
    duration_hours = meeting["duration_minutes"] / 60
    total_cost = 0
    attendee_costs = []

    for attendee in meeting["attendees"]:
        role = attendee["role"]
        salary = SALARY_ESTIMATES.get(role, 130000)  # default if role not found
        rate = hourly_rate(salary)
        cost = rate * duration_hours
        attendee_costs.append({
            "name": attendee["name"],
            "role": role,
            "hourly_rate": round(rate, 2),
            "cost": round(cost, 2),
        })
        total_cost += cost

    return {
        "meeting": meeting["name"],
        "duration_minutes": meeting["duration_minutes"],
        "attendee_count": len(meeting["attendees"]),
        "attendee_costs": attendee_costs,
        "total_cost": round(total_cost, 2),
        "cost_per_minute": round(total_cost / meeting["duration_minutes"], 2),
    }


def main():
    data = json.loads(sys.stdin.read())
    meetings = data["meetings"]

    results = []
    grand_total = 0

    for meeting in meetings:
        result = calculate_meeting_cost(meeting)
        results.append(result)
        grand_total += result["total_cost"]

    output = {
        "meetings": results,
        "daily_total": round(grand_total, 2),
        "meeting_count": len(results),
        "total_hours_in_meetings": sum(m["duration_minutes"] for m in meetings) / 60,
    }

    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
