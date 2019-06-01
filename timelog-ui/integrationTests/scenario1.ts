import { Selector } from "testcafe";

fixture `Scenario 1 : Task list at opening`
    .page `http://localhost:4200`;

test('Check we are on task list url by default', async t => {
    const location = await t.eval(() => window.location);
    await t.expect(location.pathname).eql("/task");        
});

test('Check that highlighted menu is task menu', async t => {
    let activeMenu = Selector(".active-item h4");
    await t.expect(activeMenu.exists).ok;
    await t.expect(activeMenu.innerText).eql("Tasks");       
});

test('Make sure all chips are at 0', async t => {
    const pendingChipBadge = Selector("mat-chip[data-section='pending-chip'] .mat-badge-content");
    const doneChipBadge = Selector("mat-chip[data-section='done-chip'] .mat-badge-content");
    const allChipBadge = Selector("mat-chip[data-section='all-chip'] .mat-badge-content"); 
    await t.expect(pendingChipBadge.innerText).eql("0");  
    await t.expect(doneChipBadge.innerText).eql("0");  
    await t.expect(allChipBadge.innerText).eql("0");     
});