import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFeedbacks,
  selectAllFeedbacks,
} from "../../../reducers/FeedbackSlice";

const Feedback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeedbacks());
  }, [dispatch]);

  const feedbacks = useSelector(selectAllFeedbacks);

  const date = new Date();


  return (
    <div className="container p-md-5">
      <h2 className="mt-4">Testimonials</h2>
      <div className="description-div bg-light p-3 mb-4 rounded ">
        <p className="text-dark">
        This is a list of user feedback. Below are testimonials from users who have shared their thoughts and experiences.
        </p>
      </div>
      <div className="row">
        {feedbacks.map((feedback) => (
          <div className="col-md-12 lead " key={feedback.feedId}>
            <div className="card mb-4 py-2 px-5">
              <div className="card-body">
                <h5 className="card-title">
                  {feedback.User.firstName} {feedback.User.lastName}
                </h5>
                <p className="card-text">{feedback.content}</p>
              </div>
              <p className="mx-3">{date.toDateString(feedback.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
