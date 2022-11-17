import { Card, CardContent, Typography } from "@mui/material";
import React, { FC, ReactElement } from "react";

interface ContentCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: ReactElement;
  height?: number;
  overflow?: "hidden" | "scroll"
}

const ContentCard: FC<ContentCardProps> = ({ title, subtitle, description, content, height = 500, overflow = "scroll" }: ContentCardProps): ReactElement => {
  return (
    <Card sx={{
      height,
      overflow
    }} className="remove-scroll-bar">
      <CardContent>
        <Typography variant="h3" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        {
          (description) ?
            <Typography variant="body2">
              {description}
            </Typography>
            :
            content
        }
      </CardContent>
    </Card>
  );
};

export default ContentCard;