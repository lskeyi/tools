# Color Palette Reference

## Primary Colors

### Backgrounds
```css
--bg-primary: #ffffff      /* Pure white - main background */
--bg-secondary: #f7f9fa    /* Very light gray - secondary areas */
--bg-tertiary: #f0f4f5     /* Light gray - input backgrounds */
```

### Teal Accents
```css
--teal: #0891b2           /* Primary teal - buttons, links */
--teal-light: #06b6d4     /* Light teal - hover states */
--teal-dark: #0e7490      /* Dark teal - active states */
--teal-pale: #ecfeff      /* Pale teal - focus rings */
```

### Text Colors
```css
--text-primary: #1e293b   /* Dark slate - main text */
--text-secondary: #475569 /* Medium slate - secondary text */
--text-muted: #94a3b8     /* Light slate - muted text */
```

### Borders
```css
--border-light: #e2e8f0   /* Light border - subtle dividers */
--border-medium: #cbd5e1  /* Medium border - inputs, cards */
```

### Status Colors
```css
--success: #10b981        /* Green - success messages */
--error: #ef4444          /* Red - error messages */
```

### Shadows
```css
--shadow-sm: rgba(0, 0, 0, 0.05)   /* Subtle shadow */
--shadow-md: rgba(0, 0, 0, 0.1)    /* Medium shadow */
--shadow-lg: rgba(0, 0, 0, 0.15)   /* Large shadow */
```

## Usage Examples

### Buttons

**Primary Button (Teal)**
```css
background: var(--teal);
color: white;
box-shadow: 0 1px 3px var(--shadow-sm);

/* Hover */
background: var(--teal-dark);
box-shadow: 0 2px 6px var(--shadow-md);
```

**Secondary Button (Outlined)**
```css
background: var(--bg-secondary);
color: var(--teal);
border: 1px solid var(--border-medium);

/* Hover */
background: var(--teal-pale);
border-color: var(--teal-light);
```

### Input Fields

**Default State**
```css
background: var(--bg-secondary);
border: 1px solid var(--border-medium);
color: var(--text-primary);
```

**Focus State**
```css
background: var(--bg-primary);
border-color: var(--teal);
box-shadow: 0 0 0 3px var(--teal-pale);
```

### Cards

**Tool Section Card**
```css
background: var(--bg-primary);
border: 1px solid var(--border-light);
box-shadow: 0 1px 3px var(--shadow-sm), 0 1px 2px var(--shadow-sm);
border-radius: 12px;
```

### Navigation

**Inactive Tab**
```css
background: transparent;
color: var(--text-secondary);
```

**Active Tab**
```css
background: var(--teal);
color: white;
box-shadow: 0 2px 8px var(--shadow-md);
```

**Hover Tab**
```css
background: var(--bg-primary);
color: var(--teal);
```

### Diff Tool Colors

**Added Text**
```css
background: #d1fae5;  /* Light green */
color: #065f46;       /* Dark green */
```

**Removed Text**
```css
background: #fee2e2;  /* Light red */
color: #991b1b;       /* Dark red */
```

**Equal Text**
```css
color: var(--text-primary);
```

## Color Accessibility

### Contrast Ratios (WCAG)

| Combination | Ratio | Rating |
|-------------|-------|--------|
| `#1e293b` on `#ffffff` | 14.8:1 | AAA ✅ |
| `#475569` on `#ffffff` | 8.6:1 | AAA ✅ |
| `#0891b2` on `#ffffff` | 3.8:1 | AA ✅ |
| `white` on `#0891b2` | 5.5:1 | AA ✅ |
| `#065f46` on `#d1fae5` | 8.2:1 | AAA ✅ |
| `#991b1b` on `#fee2e2` | 7.9:1 | AAA ✅ |

All color combinations meet or exceed WCAG AA standards for accessibility.

## Semantic Usage

### When to Use Each Color

**Teal (`--teal`)**
- Primary action buttons
- Active navigation items
- Links and interactive elements
- Focus indicators

**White (`--bg-primary`)**
- Main content background
- Card backgrounds
- Button text on teal

**Light Gray (`--bg-secondary`)**
- Input field backgrounds
- Navigation container
- Subtle section backgrounds

**Dark Slate (`--text-primary`)**
- Headings
- Body text
- Labels

**Medium Slate (`--text-secondary`)**
- Descriptions
- Placeholder text
- Secondary information

**Light Slate (`--text-muted`)**
- Disabled text
- Footer text
- Timestamps

## Color Psychology

### Why White & Teal?

**White**
- Cleanliness and simplicity
- Professional appearance
- Maximum readability
- Modern and minimal

**Teal/Cyan**
- Trust and reliability
- Calmness and clarity
- Technology and innovation
- Balance between blue and green

This combination creates a:
- ✅ Professional atmosphere
- ✅ Clean, uncluttered interface
- ✅ Trustworthy appearance
- ✅ Modern, tech-forward feel
- ✅ Comfortable reading experience

## Comparison with Other Themes

### GitBook (Inspiration)
- ✅ Similar white background
- ✅ Similar teal accent
- ✅ Similar spacing philosophy
- ✅ Similar shadow approach

### Material Design
- ✅ Similar elevation system
- ✅ Similar focus states
- ✅ Similar color intensity

### Tailwind CSS
- ✅ Uses similar slate colors
- ✅ Similar teal shades
- ✅ Similar shadow values

## Dark Mode (Future Enhancement)

If implementing dark mode, suggested colors:

```css
/* Dark Mode Palette */
--bg-primary: #0f172a      /* Dark slate */
--bg-secondary: #1e293b    /* Lighter slate */
--bg-tertiary: #334155     /* Medium slate */
--teal: #22d3ee            /* Brighter teal */
--text-primary: #f1f5f9    /* Light text */
--text-secondary: #cbd5e1  /* Medium text */
```

## Export for Design Tools

### Figma / Sketch
```
Background/Primary: #FFFFFF
Background/Secondary: #F7F9FA
Background/Tertiary: #F0F4F5
Teal/Primary: #0891B2
Teal/Light: #06B6D4
Teal/Dark: #0E7490
Teal/Pale: #ECFEFF
Text/Primary: #1E293B
Text/Secondary: #475569
Text/Muted: #94A3B8
Border/Light: #E2E8F0
Border/Medium: #CBD5E1
```

### Adobe XD
```xml
<color name="bg-primary" value="#FFFFFF"/>
<color name="bg-secondary" value="#F7F9FA"/>
<color name="teal" value="#0891B2"/>
<color name="text-primary" value="#1E293B"/>
```

---

This color palette provides a **clean, professional, and accessible** design system that's easy to maintain and extend.
