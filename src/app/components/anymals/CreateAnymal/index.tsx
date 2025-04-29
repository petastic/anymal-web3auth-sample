import { UserHeader } from "../../UserHeader";
import { AnymalData } from "../../../../types/Anymal.ts";
import { useState } from "react";
import { useAuthContext } from "../../../utils/auth/useAuthContext.ts";
import { v4 as uuid } from "uuid";

const formCls = "rounded-[8px] w-full border border-black bg-white p-2";

export function CreateAnymal() {
  const { userData } = useAuthContext();

  // The essential anymal requirements
  const [anymalData, setAnymalData] = useState<Partial<AnymalData>>({
    _docID: "",
    id: "",
    name: "",
    dateOfBirth: "",
    petType: "",
    breed: [],
    lifestage: "",
    passportID: uuid(),
    profileImageUrl: "",
    gender: "",
    weightLbs: 0,
    caregiverId: userData?.pid,
    temp_docID: null,
    timeAddedUtc: Date.now(),
    timeUpdatedUtc: Date.now(),
  });

  return (
    <>
      <UserHeader />
      <div className="w-full mt-15 flex flex-col items-center">
        <div className="w-full max-w-[1200px] flex flex-col space-y-3">
          <div className="w-full">
            <div>Animal Name</div>
            <input
              className={formCls}
              type="text"
              value={anymalData.name}
              placeholder="Animal Name"
              onChange={(e) =>
                setAnymalData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="w-full">
            <div>Date of birth</div>
            <input
              className={formCls}
              type="date"
              value={anymalData.dateOfBirth}
              onChange={(e) =>
                setAnymalData((prev) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }))
              }
            />
          </div>

          <div className="w-full">
            <div>Animal Type (Dog, Cat, Horse, etc.)</div>
            <input
              className={formCls}
              type="text"
              value={anymalData.petType}
              placeholder="Animal Type"
              onChange={(e) =>
                setAnymalData((prev) => ({ ...prev, petType: e.target.value }))
              }
            />
          </div>

          <div className="w-full">
            <div>Animal Breed</div>
            <input
              className={formCls}
              type="text"
              value={anymalData.breed || ""}
              placeholder="Enter a breed"
              onChange={(e) =>
                setAnymalData((prev) => ({ ...prev, breed: [e.target.value] }))
              }
            />
          </div>

          <div className="w-full">
            <div>Animal Lifestage</div>
            <input
              className={formCls}
              type="text"
              value={anymalData.lifestage}
              placeholder="Adult"
              onChange={(e) =>
                setAnymalData((prev) => ({
                  ...prev,
                  lifestage: e.target.value,
                }))
              }
            />
          </div>

          <div className="w-full">
            <div>Animal Profile Image URL</div>
            <input
              className={formCls}
              type="text"
              value={anymalData.profileImageUrl}
              placeholder="Animal Image URL"
              onChange={(e) =>
                setAnymalData((prev) => ({
                  ...prev,
                  profileImageUrl: e.target.value,
                }))
              }
            />
          </div>

          <div className="w-full">
            <div>Animal Gender</div>
            <input
              className={formCls}
              type="text"
              value={anymalData.gender}
              placeholder="Male"
              onChange={(e) =>
                setAnymalData((prev) => ({ ...prev, gender: e.target.value }))
              }
            />
          </div>

          <div className="w-full">
            <div>Animal Weight (LBS)</div>
            <input
              className={formCls}
              type="number"
              value={anymalData.lifestage}
              placeholder="25"
              onChange={(e) =>
                setAnymalData((prev) => ({
                  ...prev,
                  weightLbs: Number(e.target.value),
                }))
              }
            />
          </div>

          <button className={`${formCls} !bg-[#333333] !text-white`}>
            Add Animal
          </button>
        </div>
      </div>
    </>
  );
}
