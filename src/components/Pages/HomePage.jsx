import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "../../store/JobSlice";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { data: job, status } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getJob());
  }, [dispatch]);

  if (status === "Loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  if (status === "error") {
    return <p className="text-center text-red-500">Error fetching beats...</p>;
  }

  return (
    <>
      <div>RemoteOk Web Scraper Api HomePage</div>
      <div>
        {[...job]
          .sort(() => Math.random() - 0.5) // Shuffle the array
          .slice(0, 5) // Take the first five elements after shuffling
          .map((jobs) => (
            <div key={jobs.id}>
              <div className="px-4 py-4 mx-5 mb-4 font-normal bg-gray-300 rounded-lg">
                <div className="flex flex-col justify-between md:flex-row">
                  <h3 className="mb-2 text-2xl font-semibold leading-snug">
                    {jobs.company}
                  </h3>
                  <h4 className="mb-2 text-2xl font-semibold leading-snug">
                    position: {jobs.position}
                  </h4>
                  <div className="flex items-center mb-2 space-x-2">
                    <p className="px-2 text-gray-200 bg-blue-600 rounded">
                      tags: {jobs.tags}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">jd: {jobs.description}.</p>
                <p className="text-gray-700">url: {jobs.url}</p>
                <p className="text-gray-700">Date: {jobs.posted}</p>
                <p className="text-gray-700">salary min: {jobs.salary_min}</p>
                <p className="text-gray-700">salary max: {jobs.salary_max}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
