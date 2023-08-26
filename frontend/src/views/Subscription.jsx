import React, { useEffect } from "react";
import {
  getAllPlans,
  upgradePlan,
} from "../controllers/subscription.controller";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Subscription() {
  const [plans, setPlans] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();
  const uid = location.pathname.split("/").pop();

  useEffect(() => {
    getAllPlans(uid, (err, data) => {
      if (!!err) {
        console.log(err);
      } else {
        setPlans(data.plans);
      }
    });
  }, [uid]);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    const plan_id = searchParams.get("plan_id");
    const status = searchParams.get("status");
    
    if (!!session_id && !!plan_id && !!status) {
      if (status === "success") {
        const data = {
          uid: uid,
          plan_id: plan_id,
          session_id: session_id,
        };
        upgradePlan(data, (err, data) => {
          if (!!err) {
            console.log(err);
          } else {
            console.log(
              "this is the data from the upgrade plan controller",
              data
            );
            setSearchParams("");
            navigate(`/gallery/${uid}`);
          }
        });
      } else {
        alert("Payment failed");
      }
    }
  }, [searchParams]);

  const handleCheckout = (plan) => {
    const data = {
      uid: uid,
      plan: plan,
    };
    upgradePlan(data, (err, data) => {
      if (!!err) {
        console.log(err);
      } else {
        window.location.href = data.url;
      }
    });
  };
  return (
    <>
      <h1>Subscription</h1>
      <p>Upgrade your plan here</p>
      <div className="flex">
        {plans.map((plan) => (
          <div key={plan.name} className="col-md-4 m-3">
            <div className="card border-2 rounded p-5">
              <div className="card-body">
                <h1 className="card-title">{plan.name}</h1>
                <p className="card-text text-sm">{plan.description}</p>

                {plan.features.map((feature, id) => (
                  <p className="card-text text-sm" key={id}>
                    <strong>{feature}</strong>
                  </p>
                ))}

                <p className="card-text text-sm">
                  <strong>Price:</strong> {plan.price} $
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleCheckout(plan);
                  }}
                >
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
