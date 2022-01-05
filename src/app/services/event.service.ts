import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class EventService {
    @Output() newPostEvent$: EventEmitter<any> = new EventEmitter();
    @Output() newLikeEvent$: EventEmitter<any> = new EventEmitter();
    @Output() deleteLikeEvent$: EventEmitter<any> = new EventEmitter();
    
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
}