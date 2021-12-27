import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

function RingedAvatar({ src }) {
  // RANDOM BORDER COLOR & AVATAR
  const [Src,setSrc] = useState(src);
  const randBrdr = useRef(null);
  useEffect(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    randBrdr.current.style.border = `2px solid ${randomColor}`;
    setSrc(src
      ? src
      : `https://avatars.dicebear.com/api/human/${Math.floor(
          Math.random() * 100
        ).toString()}.svg`)
  }, []);
  return (
    <Avatar
      ref={randBrdr}
      src={Src}
    />
  );
}

export default RingedAvatar;
