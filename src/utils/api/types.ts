/* ************************************************************************** */
/*                                    Types                                   */
/* ************************************************************************** */
export interface Headers {
    [key: string]: string;
  }
  
  export interface QueryParams {
    [key: string]: string | number | boolean;
  }
  
  export interface PlaywrightAPIResponse<T>{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: T;
    // Non required methods/properties for now.
    // json(): Promise<any>;
    // text(): Promise<string>;
    // ok(): boolean;
    // url(): string;
  }