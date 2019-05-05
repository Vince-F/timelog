import { Selector } from "testcafe";

fixture `Scenario 1 : Task list`
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