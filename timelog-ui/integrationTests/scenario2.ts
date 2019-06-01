import { Selector } from "testcafe";

fixture`Scenario 2 : creating a task`
    .page`http://localhost:4200`;

async function openCreateTaskModal(t: TestController) {
    return t.click("button.mat-mini-fab");
}

async function createTestTask(t: TestController) {
    await openCreateTaskModal(t);
    return t
        .typeText("input[name='name']", "test")
        .click("button[data-section='create-button']");
}

test('Clicking on create should open a modal', async t => {
    await openCreateTaskModal(t);
    const modal = Selector(".mat-dialog-container");
    await t.expect(modal.exists).ok;
});

test('Clicking on cancel should close the modal', async t => {
    await openCreateTaskModal(t);
    await t
        .click("button[data-section='cancel-button']");

    const modal = Selector(".mat-dialog-container");
    await t.expect(modal.exists).notOk;
});

test('Clicking on create with empty value should trigger warning and not close the modal', async t => {
    await openCreateTaskModal(t);
    await t
        .click("button[data-section='create-button']");
    const errorArea = Selector("[data-section='task-name-input'] mat-error");
    await t.expect(errorArea.exists).ok;
    await t.expect(errorArea.visible).ok;

    const modal = Selector(".mat-dialog-container");
    await t.expect(modal.exists).ok;
});

test('Clicking on create with a name should create the task and close the modal', async t => {
    await createTestTask(t);
    let taskTitle = Selector("mat-list-item.task-entry h4");
    await t.expect(taskTitle.exists).ok;
    await t.expect(taskTitle.innerText).eql("test");

    const pendingChipBadge = Selector("mat-chip[data-section='pending-chip'] .mat-badge-content");
    const doneChipBadge = Selector("mat-chip[data-section='done-chip'] .mat-badge-content");
    const allChipBadge = Selector("mat-chip[data-section='all-chip'] .mat-badge-content");
    await t.expect(pendingChipBadge.innerText).eql("1");
    await t.expect(doneChipBadge.innerText).eql("0");
    await t.expect(allChipBadge.innerText).eql("1");
});

test('Clicking on done should put it to done', async t => {
    await createTestTask(t);
    await t
        .click("mat-list-item.task-entry button[data-section='done-button']")
        .click("mat-chip[data-section='done-chip']");

    let taskTitle = Selector("mat-list-item.task-entry h4");
    await t.expect(taskTitle.exists).ok;
    await t.expect(taskTitle.innerText).eql("test");

    const pendingChipBadge = Selector("mat-chip[data-section='pending-chip'] .mat-badge-content");
    const doneChipBadge = Selector("mat-chip[data-section='done-chip'] .mat-badge-content");
    const allChipBadge = Selector("mat-chip[data-section='all-chip'] .mat-badge-content");
    await t.expect(pendingChipBadge.innerText).eql("0");
    await t.expect(doneChipBadge.innerText).eql("1");
    await t.expect(allChipBadge.innerText).eql("1");
});

test("Clicking on add timelog should open the modal", async t => {
    await createTestTask(t);
    await t
        .click("mat-list-item.task-entry button[data-section='add-timelog-button']");

    const modal = Selector(".mat-dialog-container [data-section='timelog-modal']");
    await t.expect(modal.exists).ok;
});

test("Clicking on cancel in add timelog modal should close the modal", async t => {
    await createTestTask(t);
    await t
        .click("mat-list-item.task-entry button[data-section='add-timelog-button']")
        .click("button[data-section='cancel-button']");

    const modal = Selector(".mat-dialog-container [data-section='timelog-modal']");
    await t.expect(modal.exists).ok;
});

test("Clicking on create in add timelog modal with empty input should trigger warning", async t => {
    await createTestTask(t);
    await t
        .click("mat-list-item.task-entry button[data-section='add-timelog-button']")
        .click("button[data-section='create-button']");

    const dateErrorArea = Selector("[data-section='timelog-date-input'] mat-error");
    await t.expect(dateErrorArea.exists).ok;
    await t.expect(dateErrorArea.visible).ok;

    const durationErrorArea = Selector("[data-section='timelog-duration-input'] mat-error");
    await t.expect(durationErrorArea.exists).ok;
    await t.expect(durationErrorArea.visible).ok;

    const modal = Selector(".mat-dialog-container [data-section='timelog-modal']");
    await t.expect(modal.exists).ok;
});

test("Clicking on create in add timelog modal with invalid data in duration input should trigger warning", async t => {
    await createTestTask(t);
    await t
        .click("mat-list-item.task-entry button[data-section='add-timelog-button']")
        .click("button[data-section='create-button']")
        .typeText("[data-section='timelog-duration-input'] input", "fakeData");

    const durationErrorArea = Selector("[data-section='timelog-duration-input'] mat-error");
    await t.expect(durationErrorArea.exists).ok;
    await t.expect(durationErrorArea.visible).ok;

    const modal = Selector(".mat-dialog-container [data-section='timelog-modal']");
    await t.expect(modal.exists).ok;
});

/* export in task detail tests */
test('Clicking on detail button should go to detail view', async t => {
    await createTestTask(t);
    await t
        .click("mat-list-item.task-entry button[data-section='detail-button']");

    const location = await t.eval(() => window.location);
    await t.expect(location.pathname.indexOf("/task/") === 0).ok();

    let taskTitle = Selector(".task-details h1");
    await t.expect(taskTitle.exists).ok;
    await t.expect(taskTitle.innerText).eql("Task test");

    let taskStatus = Selector(".task-details [data-section='status']");
    await t.expect(taskStatus.exists).ok;
    await t.expect(taskStatus.innerText).eql("Status: Pending");

    let taskDuration = Selector(".task-details [data-section='totalTime']");
    await t.expect(taskDuration.exists).ok;
    await t.expect(taskDuration.innerText).eql("Total time spent:");
});