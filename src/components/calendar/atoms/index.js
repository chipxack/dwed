import styled from "styled-components";

export const CalendarWrapper = styled.div`
  margin-bottom: 24px;

  .rdrCalendarWrapper {
    width: 100%;
  }
 
  .rdrMonth {
    width: unset;
  }
  
  .rdrDayEndPreview{
    border: 0;
  }
  
  .rdrMonthAndYearPickers {
    font-size: 14px;
    color: #8E8E93;
  }
  
  .rdrWeekDay {
    color: #2C2C2E;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 16px;
  }
  
  .rdrDays {
    font-size: 16px;
  }
  
  .rdrDayNumber {
    font-weight: 600;
    font-size: 14px;
    
    & span::after {
      content: unset;
    }
  }
  
  .rdrEndEdge {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  
  .rdrStartEdge {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  
  .rdrDayStartPreview {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  
  .rdrDayEndPreview {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  
  .rdrDayEndOfMonth .rdrInRange, 
  .rdrDayEndOfMonth .rdrStartEdge, 
  .rdrDayEndOfWeek .rdrInRange, 
  .rdrDayEndOfWeek .rdrStartEdge {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  
  .rdrDayStartOfMonth .rdrInRange, 
  .rdrDayStartOfMonth .rdrEndEdge, 
  .rdrDayStartOfWeek .rdrInRange, 
  .rdrDayStartOfWeek .rdrEndEdge {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
 }
`
