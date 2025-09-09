#!/bin/bash
echo "Restarting ESLint server..."
echo "Please restart VS Code or run: Ctrl+Shift+P -> 'ESLint: Restart ESLint Server'"
echo ""
echo "Current ESLint configuration:"
npx eslint --print-config app/components/comon/table/CustomTable.tsx | head -20
