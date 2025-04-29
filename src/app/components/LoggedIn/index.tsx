import { useAuthContext } from "../../utils/auth/useAuthContext.ts";
import { useCallback, useState } from "react";
import { useGetAnymals } from "../../hooks/useGetAnymals.ts";
import { UserHeader } from "../UserHeader";
import { AnymalData } from "../../../types/Anymal.ts";
import { useNavigate } from "react-router-dom";

const anymalCardCls =
  "bg-[#333333] capitalize rounded-full text-white px-2 text-sm";

export function LoggedIn() {
  const [anymals, setAnymals] = useState<AnymalData[]>([]);
  const { userData, dbAuthToken } = useAuthContext();
  const getAnymals = useGetAnymals();
  const navigate = useNavigate();

  // Calls all the anymals associated with the logged-in user
  const getAnymalsFn = useCallback(() => {
    if (!userData || !dbAuthToken) return;

    getAnymals(userData, dbAuthToken).then((res) => setAnymals(res));
  }, [dbAuthToken, getAnymals, userData]);

  if (!userData) return;

  return (
    <>
      <UserHeader />
      <div className="w-full mt-15 flex flex-col">
        <div className="flex justify-center py-2">
          <button
            onClick={() => navigate("create-anymal")}
            className="bg-black rounded-full w-fit px-2 text-white py-1"
          >
            Add Anymal
          </button>
        </div>
        {anymals.length === 0 && (
          <div className="w-full flex justify-center">
            <button
              disabled={anymals.length > 0}
              onClick={getAnymalsFn}
              className="bg-black rounded-full w-fit px-2 text-white py-1"
            >
              Load Anymals
            </button>
          </div>
        )}
        <div className="space-y-5 px-2">
          {anymals.map((anymal) => (
            <div
              key={anymal.passportID}
              className="bg-white flex items-center flex-wrap gap-2 rounded-[12px] shadow-lg p-3"
            >
              <div className="font-semibold font-lg">{anymal.name}</div>
              <div className={anymalCardCls}>{anymal.petType}</div>
              <div className={anymalCardCls}>{anymal.gender}</div>
              <div className={anymalCardCls}>{anymal.lifestage}</div>
              <div className="flex items-center gap-2">
                {anymal.breed.map((breed) => (
                  <div key={breed} className={anymalCardCls}>
                    {breed}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
