'use strict';

import reviewService from '../../services/review.service.js';

export default {
    state: {
        currReview: null,
        reviews: []
    },
    getters: {
        currReview(state) {
            return state.currReview;
        },
        reviews(state) {
            return state.reviews;
        }
    },
    mutations: {
        setReview(state, {review}) {
            state.currReview = review;
        },
        setReviews(state, {reviews}) {
            state.currReviews = reviews;
        },
        saveReview(state, {review}) {
            var idx = state.reviews.findIndex(currReview => currReview._id === review.id);
            if (idx !== -1) state.reviews.splice(idx, 1, review);
            else state.reviews.unshift(review);
        },
        removeReview(state, {review}) {
            var idx = state.reviews.findIndex(currReview => currReview._id === review.id);
            if (idx) state.reviews.splice(idx, 1);
        },
    },
    actions: {
        async getReview(context, {_id}) {
            var review = await reviewService.get(_id);
            if (!_id) {
                review.aboutId = context.getters.currUser._id;
            }
            context.commit({type: 'setReview', review});
            return review
        },
        async getReviews(context, {filterBy}) {
            var reviews = await reviewService.query(filterBy);
            context.commit({type: 'setReviews', reviews});
            return reviews;
        },
        async saveReview(context, {review}) {
            review = reviewService.save(review);
            context.commit({type: 'saveReview', review});
        },
        async saveReview(context, {review}) {
            review = reviewService.save(review);
            context.commit({type: 'saveReview', review});
        },
        async removeReview(context, {_id}) {
            reviewService.remove(_id)
                .then(() => {
                    // context.commit({type: 'removeReview', review});
                    return true;
                })
        }
    }
}