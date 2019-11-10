import { faFacebookF, faTwitter, faLinkedinIn, faGooglePlusG, faPinterestP, faRedditAlien, faTumblr,
    faWhatsapp, faVk, faFacebookMessenger, faTelegramPlane, faMix, faXing, faLine
} from '@fortawesome/free-brands-svg-icons';

import { faCommentAlt,
    faEnvelope, faCheck, faPrint, faExclamation, faLink, faEllipsisH, faMinus } from '@fortawesome/free-solid-svg-icons'

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {NgModule} from '@angular/core';


@NgModule({
    declarations: [],
    imports: []
})

export class IconModule {
    constructor(library: FaIconLibrary) {
        // library.addIconPacks(fas, fab);
        library.addIcons(faFacebookF, faTwitter, faLinkedinIn, faGooglePlusG, faPinterestP, faRedditAlien, faTumblr,
            faWhatsapp, faVk, faFacebookMessenger, faTelegramPlane, faMix, faXing, faLine, faCommentAlt,
            faEnvelope, faCheck, faPrint, faExclamation, faLink, faEllipsisH, faMinus);
    }
}