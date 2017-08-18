import { Component } from '@angular/core';

import { FeedPage } from '../Feeds/feed/feed'
import { ChatPage } from '../Chats/chat/chat';
import { SettingPage } from '../Settings/setting/setting';
import { ContactsPage } from '../contact/contacts/contacts';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ContactsPage;
  tab2Root = ChatPage;
  tab3Root = FeedPage;
  tab4Root = SettingPage;

  constructor() {

  }
}
