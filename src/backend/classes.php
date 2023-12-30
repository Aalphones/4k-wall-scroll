<?php

class Response
{
  public function createProperty($propertyName, $propertyValue)
  {
    $this->{$propertyName} = $propertyValue;
  }
}
