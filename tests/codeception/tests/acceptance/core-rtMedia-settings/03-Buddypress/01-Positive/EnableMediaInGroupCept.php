<?php

/**
 * Scenario : To check if media tab for group.
 */
	use Page\Login as LoginPage;
	use Page\Constants as ConstantsPage;
	use Page\DashboardSettings as DashboardSettingsPage;
	use Page\BuddypressSettings as BuddypressSettingsPage;

	$I = new AcceptanceTester( $scenario );
	$I->wantTo( 'To check if media tab is enabled for group' );

	$loginPage = new LoginPage( $I );
	$loginPage->loginAsAdmin( ConstantsPage::$userName, ConstantsPage::$password );

	$settings = new DashboardSettingsPage( $I );
	$settings->enableBPGroupComponent();
	$settings->gotoSettings( ConstantsPage::$buddypressSettingsUrl );
<<<<<<< HEAD
	$settings->enableBPGroupComponent();
=======
	
>>>>>>> 1bd7241c18bd763089d13bafe20a8034e291801a

	$verifyEnableStatusOfMediaInGroupCheckbox = $settings->verifyStatus( ConstantsPage::$strEnableMediaInGrpLabel, ConstantsPage::$enableMediaInGrpCheckbox );
	if ( $verifyEnableStatusOfMediaInGroupCheckbox ) {
        echo nl2br( ConstantsPage::$enabledSettingMsg . "\n" );
    } else {
        $settings->enableSetting( ConstantsPage::$enableMediaInGrpCheckbox );
        $settings->saveSettings();
    }


	$buddypress = new BuddypressSettingsPage( $I );
	$buddypress->gotoGroup();

	$totalCount = $buddypress->countGroup( ConstantsPage::$groupListSelector );
	echo "Total no. of groups = " . $totalCount;

	if ( $totalCount > 0 ) {

		$buddypress->checkMediaInGroup();
		$I->seeElement( ConstantsPage::$mediaLinkOnGroup );
	} else {

		$buddypress->createGroup();
		echo "group is created!";
		$buddypress->checkMediaInGroup();
		$I->seeElement( ConstantsPage::$mediaLinkOnGroup );
	}
?>
