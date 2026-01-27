#!/bin/bash
set -e

# Java Home
JAVA_HOME_CANDIDATE="/opt/homebrew/opt/openjdk@17"

if [ ! -d "$JAVA_HOME_CANDIDATE" ]; then
    echo "Java not found at $JAVA_HOME_CANDIDATE. Installing..."
    brew install openjdk@17
fi

export JAVA_HOME="$JAVA_HOME_CANDIDATE"
export PATH="$JAVA_HOME/bin:$PATH"

# Verify Java
java -version

# Check for Maven
if ! command -v mvn &> /dev/null; then
    echo "Maven not found. Installing Maven via Homebrew..."
    brew install maven
fi

echo "Building Backend..."
cd backend
mvn clean package -DskipTests

echo "Starting Backend..."
# Run in background via nohup if needed, but for this script we just run it.
# The agent calls this with async wait, so it's fine.
java -jar target/backend-0.0.1-SNAPSHOT.jar
