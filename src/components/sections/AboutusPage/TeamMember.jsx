import React from 'react'
import { TeamMemberData } from '../../../utils/Data/TeamMembersData';

const TeamMember = () => {


  return (
    <div>
      <div className="w-full mt-10 md:mt-0 mb-20  flex justify-end">
        <div className=" w-full md:w-[80%] md:pr-20 h-full ">
          <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-3 md:gap-5">
            {TeamMemberData.map((person, index) => (
              <div key={index} className=" w-full md:w-[90%] h-[90%] flex flex-col  mb-4 items-start text-black">
                {
                  <div style={{ display: person.hidden ? "none" : "block" }} >

                    {!person.hidden &&
                      <>
                        <img src={person.img} alt={person.name} className="" />
                        <h3 className=" text-[17px] md:text-2xl  font2">{person.name}</h3>
                        <p className=" text-xs md:text-sm text-gray-600 font3 ">{person.desc}</p>
                      </>
                    }

                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default TeamMember