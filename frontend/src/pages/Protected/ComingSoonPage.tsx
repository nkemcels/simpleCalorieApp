import React from "react";

const ComingSoonPage: React.FC<{ page: string }> = ({ page }) => {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h2 style={{ fontWeight: "bold" }}>{page}</h2>
            <h4>Expect some cool stuff here. Coming soon!</h4>
        </div>
    );
};

export default ComingSoonPage;
