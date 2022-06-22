import { height } from "@mui/system";
import React from "react";

function Card({ data }) {
  return (
    <div>
      {data && (
        <div class="p-4 ">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img
              class=" image lg:h-48 md:h-36 w-full object-cover object-center"
              src={data.sprites.front_default}
              alt="blog"
            />
            <div class="p-6">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                {data.species.name}
              </h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                {data.species.name}
              </h1>
              <div>
                <h3>height: {data.height}</h3>
                <br />
                <h3>weight : {data.weight}</h3>
                <br />
                <h3>Number of battles : {data.game_indices.length}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
