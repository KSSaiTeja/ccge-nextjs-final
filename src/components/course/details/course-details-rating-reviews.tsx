import { StarTwo } from "@/components/svg";

const ratingData = [
    { stars: "5 star", percentage: 68, width: "68%" },
    { stars: "4 star", percentage: 22, width: "22%" },
    { stars: "3 star", percentage: 7, width: "7%" },
    { stars: "2 star", percentage: 2, width: "2%" },
    { stars: "1 star", percentage: 1, width: "1%" },
];

export default function CourseDetailsRatingReviews() {
    return (
        <div className="tp-course-details-2-review-rating">
            <div className="row gx-2">
                <div className="col-lg-4">
                    <div className="tp-course-details-2-review-rating-info text-center">
                        <h5>4.5</h5>
                        <div className="rating-icons mb-5">
                            <span><StarTwo /></span>
                            <span><StarTwo /></span>
                            <span><StarTwo /></span>
                            <span><StarTwo /></span>
                            <span><StarTwo clr="#BFC5CA" /></span>
                        </div>
                        <p>Rated 4 out of 1 Rating</p>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="tp-course-details-2-review-details">
                        <div className="tp-course-details-2-review-content">
                            {ratingData.map((rating, index) => (
                                <div
                                    key={index}
                                    className="tp-course-details-2-review-item d-flex align-items-center justify-content-between"
                                >
                                    <div className="tp-course-details-2-review-text">
                                        <span>{rating.stars}</span>
                                    </div>
                                    <div className="tp-course-details-2-review-progress">
                                        <div className="single-progress" style={{ width: rating.width }}></div>
                                    </div>
                                    <div className="tp-course-details-2-review-percent">
                                        <h5>{rating.percentage}%</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
