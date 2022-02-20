import React from "react";
import AccordionWrapper from "./components/AccordionWrapper";
import AccordionTitle from "./componentsAccordionTitle";
import AccordionItem from "./components/AccordionItem";
import AccordionHeader from "./components/AccordionHeader";
import AccordionBody from "./components/AccordionBody";
import FAQData from "../data/faqs.json";

function AccordionCompound() {
  return (
    <AccordionWrapper>
      <AccordionTitle>Frequently Asked Questions</AccordionTitle>
      {FAQData.map((item) => (
        <AccordionItem key={item.id}>
          <AccordionHeader>{item.header}</AccordionHeader>
          <AccordionBody>{item.body}</AccordionBody>
        </AccordionItem>
      ))}
    </AccordionWrapper>
  );
}

export default AccordionCompound;
