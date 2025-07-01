{
  "message": "No commit found for the ref chore/add-generic-copilot-instructions",
  "documentation_url": "https://docs.github.com/v3/repos/contents/",
  "status": "404"
}


---

# Repository-Specific Copilot Instructions

> This file contains repository-specific rules that will be merged with the generic frontend guidelines.
> The final merged file will be at `.github/copilot-instructions.md`

## Custom Components

### Button Component

- Always use the custom `Btn` component from `@/components/Btn`
- Include `data-testid` with format: `button--{purpose}`
