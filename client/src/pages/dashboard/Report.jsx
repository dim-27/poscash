import { getAPI } from "@/repositories/api";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ChartReport from "@/components/dashboard/ChartReport";

const FormSchema = z.object({
  start: z.date({
    required_error: "A date of birth is required.",
  }),
  end: z.date({
    required_error: "A date of birth is required.",
  }),
});

const Report = () => {
  const [start, setStart] = useState(new Date().toLocaleDateString("en-US"));
  const [end, setEnd] = useState(new Date().toLocaleDateString("en-US"));
  const onSubmit = async (data) => {
    setStart(data.start);
    setEnd(data.end);
  };

  const {
    data: report,
    isFetched,
    refetch,
  } = useQuery(
    ["report"],
    async () => {
      const res = await getAPI(`order/report?start=${start}&end=${end}`);
      return res.data;
    },
    { enabled: false }
  );

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    refetch();
  }, [start, end]);

  return (
    <div>
      <div className="">
        <Form {...form} className="flex">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end justify-around">
            <div>
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <FormMessage />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <FormMessage />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
      <div>{<ChartReport start={start} end={end} isFetched={isFetched} report={report} />}</div>
    </div>
  );
};

export default Report;
