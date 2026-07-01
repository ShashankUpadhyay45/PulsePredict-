git update-ref -d HEAD
git rm --cached -r . -f > $null 2>&1

function Commit-Files {
    param(
        [string[]]$files,
        [string]$subject,
        [string]$body
    )
    foreach ($f in $files) {
        if (Test-Path $f) {
            git add $f
        }
    }
    git commit -m $subject -m $body
}

Commit-Files @("package.json", "project-structure.txt", ".gitignore") "chore: initialize project scaffolding and configurations" "- Setup root package.json for workspace orchestration`n- Define .gitignore rules to prevent tracking node_modules, virtual envs, and databases`n- Add project structure mapping directory"

Commit-Files @("backend/Dockerfile", "backend/.dockerignore", "backend/app/database.py", "backend/app/__init__.py", "backend/app/requirements.txt") "feat: setup FastAPI application and SQLite database connection" "- Configure database connection parameters`n- Pin required dependencies in requirements.txt`n- Setup backend docker configurations"

Commit-Files @("backend/app/models.py", "backend/app/schemas.py") "feat: define database models and pydantic schemas" "- Create ORM entities for User and PredictionHistory`n- Define Pydantic request and response schemas for validation"

Commit-Files @("backend/app/utils.py", "backend/app/auth.py") "feat: implement bcrypt hashing and JWT token utility" "- Add password hashing helper functions using bcrypt`n- Build JWT token encoding, decoding, and validation utilities"

Commit-Files @("backend/app/crud.py") "feat: add user signup and prediction history crud queries" "- Implement database insertion and query helpers for users`n- Add prediction logging tracking operations"

Commit-Files @("backend/app/ml.py") "feat: develop time-series linear regression and yfinance downloader" "- Integrate yfinance downloader to gather daily price history`n- Train linear regression model on sequential closing price parameters`n- Create model serialization cache routines"

Commit-Files @("backend/app/main.py", "backend/app/logging_conf.py") "feat: implement FastAPI endpoints for prediction history and authentication" "- Map prediction routes, history searches, and oauth login`n- Add backend logging details"

Commit-Files @("frontend/package.json", "frontend/package-lock.json", "frontend/vite.config.js", "frontend/index.html", "frontend/postcss.config.js", "frontend/postcss.config.cjs", "frontend/tailwind.config.js", "frontend/tailwind.config.cjs", "frontend/src/main.jsx") "chore: bootstrap React frontend with Vite and configure tailwind" "- Setup vite build environment`n- Integrate tailwindcss and postcss stylesheets"

Commit-Files @("frontend/src/api.js", "frontend/src/components/ProtectedRoute.jsx") "feat: create api client interceptors and protected route wrappers" "- Configure axios client interceptors to automatically fetch tokens`n- Add React client routing protection guards"

Commit-Files @("frontend/src/pages/Login.jsx", "frontend/src/pages/Signup.jsx") "feat: implement login and registration frontend page views" "- Build login and signup react forms`n- Connect user authentication endpoints"

Commit-Files @("frontend/src/pages/Upload.jsx", "frontend/src/pages/History.jsx") "feat: build CSV spreadsheet upload and search logs graph views" "- Integrate bulk CSV file upload parsing`n- Add interactive graph history display rendering"

Commit-Files @("frontend/src/components/Navbar.jsx") "feat: design floating glassmorphic navigation bar with active route highlight" "- Build floating pill navbar structure`n- Configure active navigation link highlights dynamically"

Commit-Files @("frontend/src/pages/Dashboard.jsx", "frontend/src/index.css", "frontend/src/App.jsx") "style: implement dark glassmorphism UI theme and responsive AreaChart" "- Establish radial glow ambient backgrounds`n- Style metric grids and glass panels`n- Restyle Recharts AreaChart with dark grids and custom tooltips"

Commit-Files @("docker-compose.yml", "frontend/nginx.conf", "frontend/Dockerfile", "frontend/docker-compose.override.yml") "chore: add docker-compose configurations for multi-service orchestration" "- Setup docker-compose setups`n- Configure production Nginx proxy rules"

Commit-Files @(".github/workflows/ci.yml", "README.md") "docs: add project documentation and github actions CI pipeline" "- Create README setup instructions`n- Configure GitHub Actions testing pipelines"

# Add remaining cleanups
git add .
git commit -m "chore: minor configuration cleanups and finalize setup" -m "- Ignore local settings files`n- Restructure visual assets"
