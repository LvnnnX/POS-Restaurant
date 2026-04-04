POS Calculator Popup & Waiting List System - MVP Scope

Overview
- Define a lightweight, non-blocking MVP for a calculator popup anchored above the calculator button in the left column, and a waiting list system for completed orders. The MVP focuses on UI behavior, minimal data models, and a testable acceptance criteria set. No server-side logic is included in this MVP.

Goals / Success Criteria
- Calculator popup appears as a popup anchored above the calculator button in the left column, not as a full modal overlay. It should not consume additional column space when open.
- The left column layout remains at two columns (left order panel and right catalog) after the change described in context.
- Implement a minimal Waiting List for completed orders with the data model and UI hook points ready (no backend integration).
- Acceptance criteria can be executed via automated or manual tests and should verify positioning, data capture, and basic navigation to a detail view.

MVP Scope
- In-Scope:
- UI: Popup-based calculator that opens when the user taps/clicks the calculator button; popup is positioned above the button and uses absolute positioning within the left column; it does not push the grid or collapse the layout.
- Data Model: Define a WaitingListEntry interface representing a completed order with id, buyerName, total, items, and timestamp.
- UI: Basic Waiting List panel to list recent completed orders with keys for viewing details.
- Interactions: Simple actions to simulate completing an order to populate the waiting list (no real checkout server flow required in MVP).
- Tests: Acceptance criteria with concrete assertions and example scenarios to verify UI placement, data shape, and navigation to details.
- Documentation: MVP_SCOPE.md documents all requirements and validation steps.

Out of Scope
- Server-side endpoints, authentication, payment processing, or complex order statuses.
- Full end-to-end checkout flow or persistence beyond the MVP scope.
- Complex UI/UX animations beyond essential behavior.

Data Models
- WaitingListEntry
  - id: string
  - buyerName: string
  - total: number
  - items: Array<{ productId: string; name: string; price: number; quantity: number }>
  - timestamp: string  // ISO date-time

UI Wireframes (Text Description)
- Calculator popup placement:
  - Anchored to the calculator button located in the left column header area.
  - Popup appears above the button without shifting the left column width.
  - Popup width adapts to content but remains contained within the left column.
- Waiting List panel:
  - A compact panel in the left column, below the order list, showing a list of WaitingListEntry rows with buyerName, total, and timestamp.
  - Each row has a View Details action (stub) and a simple count badge for items.

Interaction Flows (Agent-Executable)
- Flow A: Open calculator popup
  - Given the left column is rendered in two-column layout, when the user taps the calculator button, the popup renders above the button without altering layout flow.
  - The calculator supports basic input; pressing = shows a computed result.
- Flow B: Add completed order to Waiting List
  - When an order is completed (e.g., via a mocked “Complete” action in the MVP), a WaitingListEntry object is created and inserted into the Waiting List panel with current timestamp.
  - The Waiting List panel displays the entry with buyerName and total.
Flow C: View details (stub)
  - Clicking View Details shows a minimal detail view (stub) with basic order items.

Acceptance Criteria (Agent-Executable)
- AC-1: Popup Positioning
  - Given the left column contains the calculator button, when the user clicks the button, a popup appears directly above the button, not altering the height of the left column or pushing other panels.
- AC-2: Popup Behavior
  - The popup can be opened and closed without reloading the page; opening uses absolute positioning within the left column; closing returns to the default state.
- AC-3: Waiting List Data Model
  - WaitingListEntry must include id, buyerName, total, items, timestamp, and be serialized to a stable structure.
- AC-4: Waiting List UI
  - Waiting List panel lists entries with correct buyerName, total, and timestamp; View Details is enabled.
- AC-5: End-to-End Minimal Flow
  - After a mocked completion, a new WaitingListEntry appears in the list with correct total and timestamp; no errors occur.

Test Plan (Scenarios)
- Scenario 1: Calculator popup opens above button and does not shift layout
  - Steps: Click Calculator button; verify popup appears above button and left column remains 2-column width.
  - Expected: Popup visible, layout unchanged.
- Scenario 2: Calculator computes value
  - Steps: Enter 12 + 7 =; verify displayed result is 19.
  - Expected: Display shows 19.
- Scenario 3: Complete order adds to Waiting List
  - Steps: Mock order completion; trigger Waiting List add with buyerName and total.
  - Expected: Waiting List shows new entry with timestamp and total.
- Scenario 4: View details for a Waiting List entry
  - Steps: Click View Details on an entry; verify detail area shows item names and prices.
  - Expected: Details panel renders without errors.

Notes / Assumptions
- This MVP intentionally avoids server integration and persistence beyond in-memory state for the duration of a session.
- Layout adjustment to 2-column is assumed to be handled as part of the client layout, not in MVP scope beyond documenting the behavior.

References
- Existing files: src/components/layout/MainLayout.tsx, src/components/calculator/CalculatorPanel.tsx, src/store/orderSlice.ts, src/components/order/OrderList.tsx
- Context: Inherited wisdom about popup placement and 3-column layout conversion to 2-column.
