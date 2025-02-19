#!/bin/bash

set -e

JIRA_CLIENT_ID="${JIRA_CLIENT_ID}"
JIRA_CLIENT_SECRET="${JIRA_CLIENT_SECRET}"

# API URLs
AUTH_URL="https://xray.cloud.getxray.app/api/v2/authenticate"
IMPORT_URL="https://xray.cloud.getxray.app/api/v2/import/execution/cucumber"

# File path to the Cucumber report
CUCUMBER_REPORT_PATH="reports/json/ui/cucumber_report_ui.json"

# Check if the Cucumber report exists
if [ ! -f "$CUCUMBER_REPORT_PATH" ]; then
    echo "Cucumber report not found at $CUCUMBER_REPORT_PATH"
    exit 1
fi

# Generate an authentication token using client ID and client secret
echo "Generating Xray authentication token..."
AUTH_TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"client_id\":\"$JIRA_CLIENT_ID\",\"client_secret\":\"$JIRA_CLIENT_SECRET\"}" "$AUTH_URL" | tr -d '"')

if [ -z "$AUTH_TOKEN" ]; then
    echo "Failed to obtain an authentication token."
    exit 1
fi

echo "Authentication token generated successfully."

# Upload the Cucumber report to Jira Xray

echo "Uploading Cucumber report to Jira Xray..."
UPLOAD_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $AUTH_TOKEN" --data "@$CUCUMBER_REPORT_PATH" "$IMPORT_URL")
if echo "$UPLOAD_RESPONSE" | grep -q 'key'; then
    echo "Cucumber report uploaded successfully."
else
    echo "Failed to upload the Cucumber report. Response from server:"
    echo "$UPLOAD_RESPONSE"
    exit 1
fi
