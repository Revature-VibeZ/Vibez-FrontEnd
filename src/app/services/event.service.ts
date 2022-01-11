import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class EventService {
    @Output() newPostEvent$: EventEmitter<any> = new EventEmitter();
    @Output() newLikeEvent$: EventEmitter<any> = new EventEmitter();
    @Output() deleteLikeEvent$: EventEmitter<any> = new EventEmitter();
    @Output() uploadProfileImageEvent$: EventEmitter<any> = new EventEmitter();
    @Output() searchProfileEvent$: EventEmitter<any> = new EventEmitter();
    //This service handles event emitters
    newPost(body: any) {
        this.newPostEvent$.emit(body);
    }

    newLike(body: any, postId: number) {
        if(body.postId !== postId) return;
        this.newLikeEvent$.emit(body)
    }

    deleteLike(likeId: number) {
        this.deleteLikeEvent$.emit(likeId)
    }

    uploadProfileImage(body: any) {
        this.uploadProfileImageEvent$.emit(body);
    }

    searchProfile(body: any) {
        this.searchProfileEvent$.emit(body);
    }
}