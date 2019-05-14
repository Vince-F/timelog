import { Selector } from "testcafe";

fixture `Scenario 2 : creating a task`
    .page `http://localhost:4200`;

async function openCreateTaskModal(t: TestController) {
    return t.click("button.mat-mini-fab");
}

test('Clicking on create should open a modal', async t => {
    await openCreateTaskModal(t);
    const modal = Selector(".mat-dialog-container")
    await t.expect(modal.exists).ok;
});

test('Clicking on create with empty value should trigger warning and not close the modal', async t => {
    await openCreateTaskModal(t);
    await t
            .click("button[data-section='create-button']");
    const errorArea = Selector("[data-section='task-name-input'] mat-error");
    await t.expect(errorArea.exists).ok;
    await t.expect(errorArea.visible).ok;       
});

test('Clicking on create with a name should create the task and close the modal', async t => {
    await openCreateTaskModal(t);
    await t
            .typeText("input[name='name']", "test")
            .click("button[data-section='create-button']");
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
    await openCreateTaskModal(t);
    await t
            .typeText("input[name='name']", "test")
            .click("button[data-section='create-button']")
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