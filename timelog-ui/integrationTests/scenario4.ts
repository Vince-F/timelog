import { Selector } from "testcafe";

fixture `Scenario 4 : Settings view`
    .page `http://localhost:4200`;

test("Clicking on settings should go to the settings menu", async t => {
    await t
            .click("[data-section='settings-menu']");
    const location = await t.eval(() => window.location);
    await t.expect(location.pathname).eql("/settings");

    let activeMenu = Selector(".active-item h4");
    await t.expect(activeMenu.exists).ok;
    await t.expect(activeMenu.innerText).eql("Settings");
});

test("Check that highlighted menu is task menu", async t => {
    await t
            .click("[data-section='settings-menu']");
    const doneRequiringTimelogCheckbox = Selector("mat-checkbox[name='isDoneRequiringTimelog']");
    const allowUndoneCheckbox = Selector("mat-checkbox[name='allowUndone']");

    await t.expect(doneRequiringTimelogCheckbox.hasClass("mat-checkbox-checked")).notOk;
    await t.expect(allowUndoneCheckbox.hasClass("mat-checkbox-checked")).notOk;
});